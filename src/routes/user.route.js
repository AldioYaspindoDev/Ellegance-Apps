import express from "express";
import { GetAllUser, GetUserById, Register, Login, DeleteUser, UpdateUser } from "../controllers/user.controllers.js";

const userRoutes = express.Router();

userRoutes.get("/", GetAllUser);
userRoutes.get("/:id", GetUserById);
userRoutes.post("/register", Register);
userRoutes.post("/login", Login);
userRoutes.put("/:id", UpdateUser);
userRoutes.delete("/:id", DeleteUser);

export default userRoutes;