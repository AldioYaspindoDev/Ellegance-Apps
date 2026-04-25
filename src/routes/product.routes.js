import express from "express";
import { getAllProduct, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controllers.js";
import { upload } from "../middleware/multer.js";

const productRoutes = express.Router();

productRoutes.get("/", getAllProduct);
productRoutes.get("/:id", getProductById);
productRoutes.post("/", upload.single("productImages"), createProduct);
productRoutes.put("/:id", upload.single("productImages"), updateProduct);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
