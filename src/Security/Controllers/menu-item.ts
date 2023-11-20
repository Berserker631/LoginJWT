import { Request, Response } from "express";
import { Item } from "../Models/menu-item";

export const getMenuItems = async (req: Request, res: Response) => {
  const listItems = await Item.findAll();
  res.json(listItems);
};
