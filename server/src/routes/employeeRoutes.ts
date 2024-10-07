import {Router} from 'express';
const employeeRouter: Router = Router();

import {createEmployee, getEmployees, updateEmployee, deleteEmployee} from '../controllers/employeeControllers';
import { authMiddleware } from '../middlewares/authMiddleware';


employeeRouter.post('/', authMiddleware as any ,createEmployee as any);
employeeRouter.get('/', authMiddleware as any, getEmployees as any);
employeeRouter.put('/:id', authMiddleware as any, updateEmployee as any);
employeeRouter.delete('/:id', authMiddleware as any, deleteEmployee as any);

export default employeeRouter;