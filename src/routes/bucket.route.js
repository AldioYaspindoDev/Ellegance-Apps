import express from "express";
import { addToBucket, getBucket, deleteBucketItem } from "../controllers/bucket.controllers.js";

const bucketRoutes = express.Router();

// Route untuk menambahkan barang ke keranjang
bucketRoutes.post("/add", addToBucket);

// Route untuk melihat isi keranjang berdasarkan userId
bucketRoutes.get("/:userId", getBucket);

//  Route delete bucket item
bucketRoutes.delete("/:id", deleteBucketItem);

export default bucketRoutes;
