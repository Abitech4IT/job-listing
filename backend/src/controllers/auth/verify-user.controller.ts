import { AppError } from "@helpers/appError";
import catchAsync from "@helpers/catchAsync";
import { CustomRequest, DecodedToken } from "@middlewares/types";
import { User } from "@models/user.model";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verify = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) return next(new AppError("No user found", 401));

    res.status(200).json({
      success: true,
      user,
    });
  }
);
