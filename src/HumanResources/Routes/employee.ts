import { Router } from "express";
import { getEmployees } from "../Controllers/employee";

export const routesEmployee = Router();
routesEmployee.get('/', getEmployees);

export default routesEmployee;