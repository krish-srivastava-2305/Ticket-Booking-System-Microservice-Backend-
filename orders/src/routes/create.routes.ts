import { authUser, currentUserMiddleware } from "@ksticketinservice/common";
import { Router } from "express";
import { body } from "express-validator";
import { createOrder } from "../controllers/create-order.controller";

const router = Router();

router.post("/create", 
    authUser,
    [
        body("ticket")
            .not()
            .isEmpty()
            .isMongoId()
            .withMessage("TicketId must be provided"),
    ],
    createOrder
);

export { router as createOrderRouter };
