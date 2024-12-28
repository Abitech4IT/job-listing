import { AppError } from "@helpers/appError";
import catchAsync from "@helpers/catchAsync";
import jobService from "@services/jobs";
import { NextFunction, Request, Response } from "express";

export const deleteJob = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const jobId = await jobService.repo.getJobById(id);

    if (!jobId) {
      return next(new AppError("Job not found", 404));
    }

    await jobService.repo.deleteJob(id);

    res.status(204).json({
      status: "success",
      message: "Ok",
    });
  }
);
