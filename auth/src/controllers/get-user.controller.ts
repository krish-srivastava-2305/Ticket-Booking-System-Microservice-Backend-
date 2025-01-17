import { NextFunction, Request, Response } from "express";

const getUserController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        return res.status(200).send({currentUser: req.currentUser || null});
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export { getUserController };
