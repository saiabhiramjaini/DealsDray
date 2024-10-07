import {Router} from 'express';
import {createUser, loginUser} from '../controllers/loginControllers';

const loginRouter: Router = Router();

loginRouter.post('/', createUser as any);
loginRouter.post('/login', loginUser as any);

export default loginRouter;