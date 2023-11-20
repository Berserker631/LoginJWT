import { Router } from 'express';
import { loginUser, newUser } from '../Controllers/user'
const router = Router();

router.post('/register', newUser);
router.post('/login', loginUser);

export default router;