import { AppError } from "@helpers/appError";
import catchAsync from "@helpers/catchAsync";
import jobService from "@services/jobs";
import { NextFunction, Request, Response } from "express";

export const getOne = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const [validatedData, validationErrors] =
      jobService.dataValidation.validateGetJobRequest(req);

    if (validationErrors) {
      return res.status(400).json({
        status: "fail",
        message: "Bad request",
        errors: validationErrors,
      });
    }

    const { id } = validatedData;

    const job = await jobService.repo.getJobById(id);

    if (!job) {
      return next(new AppError("Job not found", 404));
    }

    const transformedJob =
      await jobService.dataValidation.transformGetJobResponse(job);

    if (!transformedJob) {
      return next(
        new AppError("Jobs transformation failed or no valid jobs found.", 404)
      );
    }

    res.status(200).json({
      status: "success",
      message: "Ok",
      data: transformedJob,
    });
  }
);
