import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Product, ProductModel } from "../models/ProductModel";
import { verifyAuthToken } from "./Users";
const {TOKEN_SECRET}  = process.env
 
const store = new ProductModel();

const index = async (req: Request, res: Response) => {
  const result = await store.index();
  res.json({ result });
};
const show = async (req: Request, res: Response) => {
  const result = await store.show(req.params.id);
  res.json(result);
};

const Delete = async (req: Request, res: Response) => {
  const result = await store.delete(req.params.id);
  res.json(result);
};
const create = async (req: Request, res: Response) => {
  const newProduct: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };

  try {
    const result = await store.create(newProduct);
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const ProductRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.delete("/products/:id",verifyAuthToken, Delete);
  app.post("/products", verifyAuthToken , create);
};

export { ProductRoutes };
