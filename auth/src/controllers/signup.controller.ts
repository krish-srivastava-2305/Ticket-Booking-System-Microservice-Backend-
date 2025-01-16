import { Request, Response } from "express";
import { validationResult } from "express-validator"; 
import { User } from "../models/user.model"  
import { RequestValidationError } from "../errors/request-validation.error";
import { BadRequestErroor } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";

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

        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET_KEY!);

        req.session = { 
            token
        }

        res.status(201).send({
            id: user._id,
            email: user.email
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

export { signupController };