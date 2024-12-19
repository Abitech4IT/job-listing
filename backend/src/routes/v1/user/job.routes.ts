import jobController from "@controllers/job";
import { authenticate } from "@middlewares/user-auth.middleware";
import { Router } from "express";

const jobRoutes = Router();

jobRoutes.post("/create", jobController.add);
jobRoutes.get("/", authenticate, jobController.getAll);

export default jobRoutes;
