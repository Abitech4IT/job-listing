import { AppError } from "@helpers/appError";
import { CustomRequest } from "./types";
import { NextFunction, Response } from "express";

export const restrictTo = (...roles) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
