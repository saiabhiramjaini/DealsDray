"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeRouter = express_1.default.Router();
const employeeControllers_1 = require("../controllers/employeeControllers");
employeeRouter.post('/', employeeControllers_1.createEmployee);
employeeRouter.get('/', employeeControllers_1.getEmployees);
employeeRouter.put('/:id', employeeControllers_1.updateEmployee);
employeeRouter.delete('/:id', employeeControllers_1.deleteEmployee);
exports.default = employeeRouter;
