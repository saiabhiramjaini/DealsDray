import { Request, Response } from 'express';
import z from 'zod';

const employeeSchema = z.object({
    name: z.string().min(1, {message:"Name is required"}),
    email: z.string().email({message: "Invalid email address"}),
    mobile: z.string().min(1, {message: "Mobile number is required"}),
    designation: z.enum(["HR", "Manager", "Sales"], {message: "Invalid designation"}),
    gender: z.enum(["M", "F"], {message:"Invalid gender"}),
    course: z.enum(["MCA", "BCA", "BSC"], {message: "Invalid course"}),
    image: z.string().url({message: "Invalid image URL"})
});

export const createEmployee = async (req: Request, res: Response) => {
    try {
    }
    catch (err) {
    }
}

export const getEmployees = async (req: Request, res: Response) => {
    try {
    }
    catch (err) {
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    try {
    }
    catch (err) {
    }
}

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
    }
    catch (err) {
    }
}

