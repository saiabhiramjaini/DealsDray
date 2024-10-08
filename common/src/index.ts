import {z} from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, { message: "Username should be non-empty" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  });

export const employeeSchema = z.object({
    name: z.string().min(1, {message:"Name is required"}),
    email: z.string().email({message: "Invalid email address"}),
    mobile: z.string().min(10, {message: "Mobile number should contain 10 digits"}),
    designation: z.enum(["HR", "Manager", "Sales"], {message: "Invalid designation"}),
    gender: z.enum(["M", "F"], {message:"Invalid gender"}),
    course: z.enum(["MCA", "BCA", "BSC"], {message: "Invalid course"}),
    image: z.string({message: "Upload Image"}).url({ message: "Invalid image URL" })
});

export type Login = z.infer<typeof loginSchema>;
export type Employee = z.infer<typeof employeeSchema>;

export enum designationEnum {
    "HR",
    "Manager",
    "Sales"
}

export enum genderEnum {
    "M",
    "F"
}

export enum courseEnum {
    "MCA",
    "BCA",
    "BSC"
}