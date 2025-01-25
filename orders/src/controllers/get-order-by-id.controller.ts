import { NextFunction, Request, Response } from "express";
import { Order } from "../models/orders.model";
import { NotFoundError, RequestValidationError } from "@ksticketinservice/common";
import { validationResult } from "express-validator";

export const fetchOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            throw new NotFoundError();
        }
        res.status(200).send(order);
    } catch (error) {
        next(error);
    }
}

