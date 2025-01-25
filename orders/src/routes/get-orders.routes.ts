import { authUser, currentUserMiddleware } from "@ksticketinservice/common";
import { Request, Response, Router } from "express";
import { getUserOrders } from "../controllers/get-user-orders.controller";

const router = Router();

router.get("/", 
    authUser, 
    getUserOrders
    );

export { router as getOrdersRouter };