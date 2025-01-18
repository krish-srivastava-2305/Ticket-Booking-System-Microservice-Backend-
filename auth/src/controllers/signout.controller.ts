import { NextFunction, Request, Response } from "express";
import { BadRequestErroor } from "@ksticketinservice/common";

const signoutController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.session?.token) {
            throw new BadRequestErroor("User not logged in");
        }
        req.session = {
            token: ""
        };
        res.status(200).send("Signout");
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export { signoutController };

