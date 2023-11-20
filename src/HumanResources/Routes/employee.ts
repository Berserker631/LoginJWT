import { Router } from "express";
import { getEmployees } from "../Controllers/employee";

const router = Router();
router.get('/', getEmployees);

export default router;