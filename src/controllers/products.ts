import { Request, Response } from "express"
import { Product } from "../models/product"

export const getProducts = async (req: Request, res: Response) => {
    const listItems = await Product.findAll();
    res.json( listItems )
}