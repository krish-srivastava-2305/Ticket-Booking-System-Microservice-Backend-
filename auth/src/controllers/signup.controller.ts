import { Request, Response } from "express";
import { validationResult } from "express-validator";   
import { RequestValidationError } from "../errors/request-validation.error";

const signupController = async (req: Request, res: Response, next: any) : Promise<any> => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        const { email, password } = req.body;

        console.log("Signing up user with email: ", email);
        return res.send("New User");
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export { signupController };