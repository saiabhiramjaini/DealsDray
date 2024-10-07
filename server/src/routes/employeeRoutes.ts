import express from 'express';
const employeeRouter = express.Router();

import {createEmployee, getEmployees, updateEmployee, deleteEmployee} from '../controllers/employeeControllers';


employeeRouter.post('/', createEmployee);
employeeRouter.get('/', getEmployees);
employeeRouter.put('/:id', updateEmployee);
employeeRouter.delete('/:id', deleteEmployee);

export default employeeRouter;