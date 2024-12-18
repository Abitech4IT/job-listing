import { Router } from "express";
import authRoutes from "./auth.routes";

const userRoutes = Router();

userRoutes.use("/auth", authRoutes);

export default userRoutes;
