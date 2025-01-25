import { Order } from "../models/orders.model";
import { NextFunction, Request, Response } from "express";

export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await Order.find({ userId: req.currentUser?.id });
        res.status(200).send(orders);
    } catch (error) {
        next(error);
    }
}

