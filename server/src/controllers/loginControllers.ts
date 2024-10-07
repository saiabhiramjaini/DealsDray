import { Request, Response } from "express";
import z from "zod";
import bcrypt from "bcrypt";
import LoginModel from "../models/loginModel";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username should be non-empty" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const existingUser = await LoginModel.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Please login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await LoginModel.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created", user: newUser });
  } 
  catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors.map((error) => ({
          field: error.path[0],
          message: error.message,
        })),
      });
    }

    console.error("Error creating user:", err);
    return res
      .status(500)
      .json({
        message: "An unexpected error occurred. Please try again later.",
      });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password } = loginSchema.parse(req.body);
    
        const existingUser = await LoginModel.findOne({ username });
        if (!existingUser) {
          return res
            .status(400)
            .json({ message: "User doesn't exists. Please Signin." });
        }
    
        const comparePassword = await bcrypt.compare(password, existingUser.password);
    
        if (!comparePassword) {
          return res.status(400).json({ message: "Invalid password" });
        }

        return res.status(200).json({ message: "Login successful" });
      } 
      catch (err) {
        if (err instanceof z.ZodError) {
          return res.status(400).json({
            message: "Validation failed",
            errors: err.errors.map((error) => ({
              field: error.path[0],
              message: error.message,
            })),
          });
        }
    
        console.error("Error creating user:", err);
        return res
          .status(500)
          .json({
            message: "An unexpected error occurred. Please try again later.",
          });
      }
};
