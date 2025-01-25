import { NextFunction, Request, Response } from "express";
import { Order } from "../models/orders.model";
import { validationResult } from "express-validator";
import { NotAuthorizedError, NotFoundError, RequestValidationError } from "@ksticketinservice/common";
import { OrderPublisher } from "../events/publishers";
import { natsWrapper } from "../events/init";

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // validate the request body
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { orderId } = req.params;

        // get the order from the database
        const order = await Order.findById(orderId);
        if(!order) {
            throw new NotFoundError();
        }

        // check if the order belongs to the current user
        if(order.userId !== req.currentUser?.id) {
            throw new NotAuthorizedError();
        }
        // cancel the order
        order.status = "cancelled";
        await order.save();

        // Publish an event for the cancelled order
        new OrderPublisher(natsWrapper.client).publish("order.cancelled", {
            id: order.id,
            ticket: {
                id: order.ticket.id
            }
        })
        console.log("Order cancelled event published");

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

