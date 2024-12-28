import jobController from "@controllers/job";
import { restrictTo } from "@middlewares/isAdmin.middleware";
import { authenticate } from "@middlewares/user-auth.middleware";
import { Router } from "express";

const jobRoutes = Router();

jobRoutes.post("/create", authenticate, restrictTo("admin"), jobController.add);
jobRoutes.get("/", authenticate, jobController.getAll);
jobRoutes.get("/:id", authenticate, jobController.getOne);
jobRoutes.patch(
  "/:id",
  authenticate,
  restrictTo("admin"),
  jobController.update
);
jobRoutes.delete(
  "/:id",
  authenticate,
  restrictTo("admin"),
  jobController.deleteJob
);

export default jobRoutes;
