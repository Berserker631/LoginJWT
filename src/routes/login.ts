import { Router } from "express";
import { generateSecret, verifyOTP } from "../controllers/login";

const router = Router();

router.get('/generate', generateSecret);

router.post('/verify', verifyOTP);

export default router;