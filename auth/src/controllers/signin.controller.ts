import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation.error";

const signinController = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        const { email, password } = req.body;

        console.log("Signing in user with email: ", email);
        return res.send("New User");
    } catch (error) {
        console.log(error);
        next(error);
    }
}



export { signinController };
