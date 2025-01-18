import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "@ksticketinservice/common";
import { User } from "../models/user.model";
import { BadRequestErroor } from "@ksticketinservice/common";
import { Password } from "../services/password.service";
import jwt from "jsonwebtoken"

const signinController = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user) {
            throw new BadRequestErroor("User not found");
        }

        const isMatch = await Password.compare(user.password, password);
        if(!isMatch) {
            throw new BadRequestErroor("Invalid credentials");
        }

        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET_KEY!);
        req.session = {
            token
        }

        return res.status(200).send({id: user._id, email: user.email});
    } catch (error) {
        next(error);
    }
}



export { signinController };
