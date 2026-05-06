import express from "express";
import { createTransaction } from "../controllers/paymentController.js";

const OrderRoute = express.Router();

OrderRoute.post("/", createTransaction);

export default OrderRoute;