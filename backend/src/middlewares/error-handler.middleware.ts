import { Error } from "mongoose";
import express from "express";
import { AppError } from "@helpers/appError";

interface MongoError extends Error {
  keyValue: {
    [key: string]: any;
  };
}

const handleDuplicateFieldsDB = (err: MongoError) => {
  const value = err.keyValue.name;
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: Error.ValidationError) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token, pls log in again.", 401);
const handleJWTExpiredError = () =>
  new AppError("Your token has expired, pls log in again.", 401);

export const errorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };

  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error._message === "Validation failed")
    error = handleValidationErrorDB(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
