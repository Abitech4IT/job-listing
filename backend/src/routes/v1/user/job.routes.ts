import jobController from "@controllers/job";
import { Router } from "express";

const jobRoutes = Router();

jobRoutes.post("/create", jobController.add);
jobRoutes.get("/", jobController.getAll);

export default jobRoutes;
