import {Router} from 'express';
import {createUser, loginUser} from '../controllers/loginControllers';

const loginRouter: Router = Router();

loginRouter.post('/', createUser);
loginRouter.post('/login', loginUser);

export default loginRouter;