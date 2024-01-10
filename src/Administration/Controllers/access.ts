import { Request, Response } from "express";
import sequelize from "../../db/connection";
import { permission } from "../Models/permission";
import { QueryTypes } from "sequelize";

export const getAccess = async (req: Request, res: Response) => {
  const roles = await sequelize.query(
    `
    SELECT idPermission, [name], description
    FROM security.permission P
    WHERE P.permission_idPermission IS NULL
    ORDER BY [name]`,
    { type: QueryTypes.SELECT }
  );
  res.json(roles);
};

export const updatePermission = async (req: Request, res: Response) => {
  const { idPermission, name, description } = req.body;
  const listPermission = await permission.findOne({ where: { idPermission } });
  if (!listPermission) {
    try {
      await permission.create({
        name,
        description,
        permission_idPermission: null,
        isActive: 1,
        user_idUser_log: "",
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    try {
      const result = await permission.update(req.body, {
        where: {
          idPermission,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const getDepartments = async (req: Request, res: Response) => {
  try {
    const { permission_idPermission } = req.query;
    const listDepartments = await permission.findAll({
      where: { permission_idPermission },
    });
    res.json(listDepartments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({error: "Something Wrong"})
  }
}

export const getGroups = async (req: Request, res: Response) => {
  try {
    const { permission_idPermission } = req.query;
    const listGroups = await permission.findAll({
      where: { permission_idPermission },
    });
    res.json(listGroups);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
