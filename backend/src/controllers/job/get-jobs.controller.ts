import { AppError } from "@helpers/appError";
import catchAsync from "@helpers/catchAsync";
import jobService from "@services/jobs";
import { NextFunction, Request, Response } from "express";

export const getAll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const [validatedData, validationErrors] =
      jobService.dataValidation.validateGetAllJobsRequest(req);
    if (validationErrors) {
      res.status(400).json({
        status: 400,
        message: "Bad request",
        errors: validationErrors,
      });
      return;
    }

    const query = validatedData.query;

    const jobs = await jobService.getJobs({ ...query });

    if (!jobs || jobs.length === 0) {
      return next(new AppError("No jobs found", 404));
    }

    const transformedJobs = await Promise.all(
      jobs.map((job) =>
        jobService.dataValidation
          .transformGetJobResponse(job)
          .catch((error) => {
            console.error(`Error transforming job: ${error}`);
            return null;
          })
      )
    );

    // Filter out any null or invalid transformations
    const validTransformedJobs = transformedJobs.filter(Boolean);

    if (!validTransformedJobs || validTransformedJobs.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Jobs transformation failed or no valid jobs found.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Ok",
      data: validTransformedJobs,
    });
  }
);
