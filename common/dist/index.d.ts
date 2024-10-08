import { z } from 'zod';
export declare const loginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const employeeSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    mobile: z.ZodString;
    designation: z.ZodEnum<["HR", "Manager", "Sales"]>;
    gender: z.ZodEnum<["M", "F"]>;
    course: z.ZodEnum<["MCA", "BCA", "BSC"]>;
    image: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    mobile: string;
    designation: "HR" | "Manager" | "Sales";
    gender: "M" | "F";
    course: "MCA" | "BCA" | "BSC";
    image: string;
}, {
    name: string;
    email: string;
    mobile: string;
    designation: "HR" | "Manager" | "Sales";
    gender: "M" | "F";
    course: "MCA" | "BCA" | "BSC";
    image: string;
}>;
export type Login = z.infer<typeof loginSchema>;
export type Employee = z.infer<typeof employeeSchema>;
export declare enum designationEnum {
    "HR" = 0,
    "Manager" = 1,
    "Sales" = 2
}
export declare enum genderEnum {
    "M" = 0,
    "F" = 1
}
export declare enum courseEnum {
    "MCA" = 0,
    "BCA" = 1,
    "BSC" = 2
}
