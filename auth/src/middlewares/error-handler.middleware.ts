import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if(err instanceof CustomError) {
        res.status(err.statusCode).json({errors: err.serializeErrors()});
    }
    res.status(500).json({errors: [{message: "Something went wrong"}]});
}