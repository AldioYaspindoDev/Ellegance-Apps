import express from "express";
import { getAllProduct, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controllers.js";

const productRoutes = express.Router();

productRoutes.get("/", getAllProduct);
productRoutes.get("/:id", getProductById);
productRoutes.post("/", createProduct);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
