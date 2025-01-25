import { authUser, currentUserMiddleware } from "@ksticketinservice/common";
import { Request, Response, Router } from "express";
import { fetchOrderById } from "../controllers/get-order-by-id.controller";
import { param } from "express-validator";

const router = Router();

router.get("/:orderId",
    authUser,   
    [
        param("orderId").isMongoId().withMessage("Invalid orderId")
    ],
    fetchOrderById
);

export { router as getOrderByIdRouter };