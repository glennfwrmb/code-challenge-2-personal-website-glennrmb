import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error";

export const errorMiddleware = (
  error: unknown,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.status).json({
      success: false,
      message: error.message,
      data: {},
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    data: {},
  });
};