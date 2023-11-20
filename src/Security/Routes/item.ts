import { Router } from "express";
import { getMenuItems } from "../Controllers/menu-item";
import validateToken from "../../Shared/Tools/validate-token";

const router = Router();

// router.get('/', validateToken, getMenuItems)
router.get('/', getMenuItems)

export default router; 