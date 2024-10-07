"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginRouter = express_1.default.Router();
const loginControllers_1 = require("../controllers/loginControllers");
loginRouter.post('/', loginControllers_1.createUser);
loginRouter.post('/login', loginControllers_1.loginUser);
exports.default = loginRouter;
