import { Router } from "express";
import { getMenuItems, updateMenuItems } from "../Controllers/menu-item";
import validateToken from "../../Shared/Tools/validate-token";

export const routesItem = Router();

routesItem.get('/',  getMenuItems)
routesItem.post('/updateMenu', updateMenuItems)

export default routesItem; 