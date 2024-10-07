import { Request, Response } from 'express';
import z from 'zod';
import EmployeeModel from '../models/employeeModel';


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
      const employeeData = employeeSchema.parse(req.body);
  
      const existingEmployee = await EmployeeModel.findOne({ email: employeeData.email });
      if (existingEmployee) {
        return res.status(400).json({ message: "Employee already exists." });
      }
  
      const newEmployee = await EmployeeModel.create(employeeData);
      return res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    } 
    catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: err.errors.map(error => ({
            field: error.path[0],
            message: error.message
          }))
        });
      }
      console.error("Error creating employee:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

export const getEmployees = async (req: Request, res: Response) => {
    try {
      const employees = await EmployeeModel.find();
      return res.status(200).json(employees);
    } 
    catch (err) {
      console.error("Error retrieving employees:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

  export const updateEmployee = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const employeeData = employeeSchema.parse(req.body);
  
      const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, employeeData, { new: true });
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      return res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
    } 
    catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: err.errors.map(error => ({
            field: error.path[0],
            message: error.message
          }))
        });
      }
      console.error("Error updating employee:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

  export const deleteEmployee = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);
  
      if (!deletedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      return res.status(200).json({ message: "Employee deleted successfully" });
    } 
    catch (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

