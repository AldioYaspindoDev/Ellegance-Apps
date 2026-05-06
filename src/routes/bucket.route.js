import express from "express";
import { addToBucket, getBucket, deleteBucketItem, updateBucketItemQuantity, clearBucket } from "../controllers/bucket.controllers.js";

const bucketRoutes = express.Router();

// Route untuk menambahkan barang ke keranjang
bucketRoutes.post("/add", addToBucket);

// Route untuk melihat isi keranjang berdasarkan userId
bucketRoutes.get("/:userId", getBucket);

//  Route delete bucket item
bucketRoutes.delete("/:id", deleteBucketItem);

// Route untuk update quantity item di keranjang
bucketRoutes.put("/:id", updateBucketItemQuantity);

// Route untuk mengosongkan keranjang
bucketRoutes.delete("/clear/:userId", clearBucket);

export default bucketRoutes;
