import express from "express";
import { createTransaction, getOrdersByUser } from "../controllers/paymentController.js";

const OrderRoute = express.Router();

OrderRoute.post("/", createTransaction);
OrderRoute.get("/user/:email", getOrdersByUser);

export default OrderRoute;