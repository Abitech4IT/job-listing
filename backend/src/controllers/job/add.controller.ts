import catchAsync from "@helpers/catchAsync";
import jobService from "@services/jobs";
import { NextFunction, Request, Response } from "express";

export const add = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const [validatedData, validationErrors] =
      jobService.dataValidation.validateAddJobRequest(req);

    if (validationErrors) {
      res.status(400).json({
        status: 400,
        message: "Bad request",
        errors: validationErrors,
      });
      return;
    }

    const body = validatedData.body;

    const job = await jobService.repo.add({ ...body });

    res.status(201).json({
      status: "success",
      message: "Created",
      job,
    });
  }
);
