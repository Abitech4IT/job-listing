import { Router } from "express";
import authRoutes from "./auth.routes";
import jobRoutes from "./job.routes";

const userRoutes = Router();

userRoutes.use("/auth", authRoutes);
userRoutes.use("/jobs", jobRoutes);

export default userRoutes;
