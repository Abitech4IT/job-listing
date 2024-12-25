import authController from "@controllers/auth";
import { authenticate } from "@middlewares/user-auth.middleware";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/signup", authController.signUp);
authRoutes.post("/login", authController.login);
authRoutes.get("/verify", authenticate, authController.verify);
authRoutes.get("/logout", authController.logout);

export default authRoutes;
