import {Router} from 'express';
const employeeRouter: Router = Router();

import {createEmployee, getEmployees, updateEmployee, deleteEmployee} from '../controllers/employeeControllers';


employeeRouter.post('/', createEmployee);
employeeRouter.get('/', getEmployees);
employeeRouter.put('/:id', updateEmployee);
employeeRouter.delete('/:id', deleteEmployee);

export default employeeRouter;