import { Request, Response } from "express";
import { validationResult } from "express-validator"; 
import { User } from "../models/user.model"  
import { RequestValidationError } from "../errors/request-validation.error";
import { BadRequestErroor } from "../errors/bad-request-error";

const signupController = async (req: Request, res: Response, next: any) : Promise<any> => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        const { email, password } = req.body;  

        const existingUser = await User.findOne({email});
        if(existingUser) {
            throw new BadRequestErroor("Email in use");
        }
        
        const user = User.build({email, password});
        await user.save();

        res.status(201).send(user);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

export { signupController };