import { authUser } from "@ksticketinservice/common";
import { Router } from "express";
import { param } from "express-validator";
import { deleteOrder } from "../controllers/delete-order.controller";

const router = Router();

router.delete("/delete/:orderId", 
    authUser,
    [
        param("orderId").isMongoId().withMessage("Invalid orderId")
    ],
    deleteOrder
);

export { router as deleteOrderRouter }