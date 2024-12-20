import jobController from "@controllers/job";
import { restrictTo } from "@middlewares/isAdmin.middleware";
import { authenticate } from "@middlewares/user-auth.middleware";
import { Router } from "express";

const jobRoutes = Router();

jobRoutes.post("/create", authenticate, restrictTo("admin"), jobController.add);
jobRoutes.get("/", authenticate, jobController.getAll);

export default jobRoutes;
