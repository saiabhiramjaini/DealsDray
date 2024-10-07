import { Request, Response } from 'express';
import z from 'zod';

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  });

export const createUser = async (req: Request, res: Response) => {
    try{
        
    }
    catch(err){

    }
}

export const loginUser = async (req: Request, res: Response) => {
    try{

    }
    catch(err){

    }
}
