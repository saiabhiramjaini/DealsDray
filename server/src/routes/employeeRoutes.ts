import {Router} from 'express';
const employeeRouter: Router = Router();

import {createEmployee, getEmployees, updateEmployee, deleteEmployee} from '../controllers/employeeControllers';


employeeRouter.post('/', createEmployee as any);
employeeRouter.get('/', getEmployees as any);
employeeRouter.put('/:id', updateEmployee as any);
employeeRouter.delete('/:id', deleteEmployee as any);

export default employeeRouter;