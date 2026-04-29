import express from "express";
import { GetAllUser, GetUserById, Register, Login, DeleteUser, UpdateUser, GetMe } from "../controllers/user.controllers.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.get("/", GetAllUser);
userRoutes.get("/me", verifyToken, GetMe); // Route baru untuk mengambil info user yang login
userRoutes.get("/:id", GetUserById);
userRoutes.post("/register", Register);
userRoutes.post("/login", Login);
userRoutes.put("/:id", UpdateUser);
userRoutes.delete("/:id", DeleteUser);

export default userRoutes;