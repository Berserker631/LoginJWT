import { Router } from "express";
import { getAccess, getDepartments, getGroups, updatePermission } from "../Controllers/access";

export const routesAccess = Router();
routesAccess.get('/access', getAccess);
routesAccess.post('/updatePermission', updatePermission);
routesAccess.get('/getDepartments', getDepartments)
routesAccess.get('/getGroups', getGroups)
export default routesAccess;