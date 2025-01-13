import { Request, Response } from "express";

const signoutController = (req: Request, res: Response) => {
    res.send("Signout");
}

export { signoutController };

