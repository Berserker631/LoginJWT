import { Router } from 'express';
import { loginUser, newUser } from '../Controllers/user'

export const routesUser = Router();

routesUser.post('/register', newUser);
routesUser.post('/login', loginUser);

export default routesUser;