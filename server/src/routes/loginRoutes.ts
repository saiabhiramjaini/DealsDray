import express from 'express';
const loginRouter = express.Router();

import {createUser, loginUser} from '../controllers/loginControllers';

loginRouter.post('/', createUser);
loginRouter.post('/login', loginUser);

export default loginRouter;