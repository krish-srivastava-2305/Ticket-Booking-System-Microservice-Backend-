import { Request, Response } from "express";

const getUserController = (req: Request, res: Response) => {
    res.send("New User");
}

export { getUserController };
