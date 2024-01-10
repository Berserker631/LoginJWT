import { Request, Response } from "express";
import { Item } from "../Models/menu-item";

export const getMenuItems = async (req: Request, res: Response) => {
  const listItems = await Item.findAll();
  res.json(listItems);
};

export const updateMenuItems = async (req: Request, res: Response) => {
  const { menu_idMenu, idMenu, name, displayName, path } = req.body;
  const listItem = await Item.findOne({ where: { idMenu } });
  
  if (!listItem) {
    try {
      await Item.create({
        menu_idMenu,
        name,
        displayName,
        path,
        user_idUser_log: null,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    try {
      const result = await Item.update(req.body, {
        where: {idMenu},
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
