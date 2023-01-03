import { Router } from "express";
import { v4 as uuid } from "uuid";
import { Categories } from "../models/Category-model";

const categoriesRouters = Router();
const categories: Categories[] = [];

categoriesRouters.post("/", (req, res) => {
  const { description, name } = req.body;

  const category = new Categories();

  Object.assign(category, {
    id: uuid(),
    name,
    description,
    created_At: new Date(),
  });

  categories.push(category);

  res.status(201).json({ category });
});

export { categoriesRouters };
