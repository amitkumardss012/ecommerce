import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorClass";
import { statusCode } from "../types/types";
import { ZodError } from "zod";
import { fileCleanup } from "../helpers/fs";

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  if (err.name === "CastError") err.message = "Invalid ID";

  // Zod error
  if (err instanceof ZodError) {
    const zodErr = zodError(err);
    return res.status(statusCode.Bad_Request).json({
      message: "validation failed",
      error: zodErr,
    });
  }

  // Cleanup uploaded files when any error occurd
  fileCleanup(req)
    .then(() => {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    })
    .catch(next);

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

// export const asyncHandler = (func: ControllerType) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         return Promise.resolve(func(req, res, next)).catch(next);
//     }
// }

type AsyncHandlerFunction<TReq extends Request> = (
  req: TReq,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler =
  <TReq extends Request>(fn: AsyncHandlerFunction<TReq>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req as TReq, res, next)).catch(next);
  };

const zodError = (error: ZodError) => {
  let errors: any = {};
  error.errors.map((issue) => {
    const path = issue.path?.[0];
    if (path) errors[path] = issue.message;
  });
  return errors;
};
