import { Request, Response } from "express";
import { Employee } from "../Models/employee";
import sequelize from "../../db/connection";

export const getEmployees = async (req: Request, res: Response) => {
  // const listItems = await Employee.findAll();
  const { QueryTypes } = require("sequelize");
  const users = await sequelize.query(
    `
    SELECT 
 SUBSTRING(L.[location], -1, CHARINDEX(',', L.[location])) AS lat,
 SUBSTRING(L.[location], CHARINDEX(',', L.[location]) + 1, LEN(L.[location]) - CHARINDEX(',', L.[location])) AS lng,
 L.CodEmployee,
 L.Name

FROM (
    SELECT 
     H.CodEmployee ,
     CONCAT(TRIM(E.FirstName), ' ', E.FirstLastName) AS [Name],
     REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(H.Location, 'https://maps.google.com', ''), 'maps', ''),'/?q=', ''), '%2c', ','), '&z=17&hl=es', '') AS [location]
    FROM HumanResources.Employee E
    INNER JOIN HumanResources.EmployeeHist H ON E.IdEmployee = H.IdEmployee 
    WHERE (H.IsActive = 1 OR H.IsAttendance = 1) AND ISNULL(H.Location, '' AND H.CodEmployee != '390-00459') != '') AS L
    ORDER BY L.Name ASC`,
    { type: QueryTypes.SELECT }
  );
  res.json(users);
};
