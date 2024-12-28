import { AppError } from "@helpers/appError";
import catchAsync from "@helpers/catchAsync";
import jobService from "@services/jobs";
import { NextFunction, Request, Response } from "express";

export const update = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const [validatedData, validationErrors] =
      jobService.dataValidation.validateUpdateJobRequest(req);

    if (validationErrors) {
      return res.status(400).json({
        status: "fail",
        message: "Bad request",
        errors: validationErrors,
      });
    }

    const { id } = req.params;
    const { body } = validatedData;

    const jobId = await jobService.repo.getJobById(id);

    if (!jobId) {
      return next(new AppError("Job not found", 404));
    }

    const updatedJob = await jobService.repo.update(id, body);

    res.status(200).json({
      status: "success",
      message: "Ok",
      data: updatedJob,
    });
  }
);
