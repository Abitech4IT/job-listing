import { AppError } from "@helpers/appError";
import catchAsync from "@helpers/catchAsync";
import { IUserDocument, User } from "@models/user.model";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CustomRequest, DecodedToken } from "./types";

export const authenticate = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    //Getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(
        new AppError("You are not logged in! pls log in to get access", 401)
      );
    }

    //token verification
    const decoded = await new Promise<DecodedToken>((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
        if (err) reject(err);
        resolve(decoded as DecodedToken);
      });
    });

    //checking if user still exist
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("The user belonging token is no longer exist", 401)
      );
    }

    //Grant access to protected routes
    req.user = currentUser;
    next();
  }
);
