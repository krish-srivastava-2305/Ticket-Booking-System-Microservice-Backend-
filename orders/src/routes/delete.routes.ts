import { authUser, currentUserMiddleware } from "@ksticketinservice/common";
import { Request, Response, Router } from "express";

const router = Router();

router.delete("/delete/:orderId", 
    currentUserMiddleware, 
    authUser,
    async (req: Request, res: Response) => {
        res.send("Hello World");
});

export { router as deleteOrderRouter }