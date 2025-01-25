import { NextFunction, Request, Response } from "express";
import { Order } from "../models/orders.model";
import { BadRequestErroor, NotFoundError, RequestValidationError } from "@ksticketinservice/common";
import { Ticket } from "../models/tickets.model";
import { validationResult } from "express-validator";
import { OrderPublisher } from "../events/publishers";
import { natsWrapper } from "../events/init";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // validate the request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        // to test on postman
        // const dummyTicket = Ticket.build({
        //     title: "test",
        //     price: 100,
        //     version: 1
        // });
        // await dummyTicket.save();

        // get the ticket id from the request body
        const { ticket } = req.body;
        // const ticket = dummyTicket._id; // to test on postman
        const userId = req.currentUser?.id as string;

        // get the ticket from the database
        const existingTicket = await Ticket.findById(ticket);
        if (!existingTicket) {
            throw new NotFoundError();
        }

        // check if the ticket is reserved
        const isReserved = await existingTicket.isReserved();
        if (isReserved) {
            throw new BadRequestErroor("Ticket is already reserved");
        }

        // set the expiration time for the order
        const expirationTime = new Date();
        expirationTime.setSeconds(expirationTime.getSeconds() + 15*60) // time should be set as ENV or on database to be dynamically set by admin

        // create the order
        const order = Order.build({
            userId,
            ticket: existingTicket,
            status: "created",
            expiresAt: expirationTime
        });

        await order.save();

        // Publish an event for the new order
        new OrderPublisher(natsWrapper.client).publish("order.created", {
            id: order.id,
            ticket: {
                id: order.ticket.id,
                price: order.ticket.price
            },
            userId: order.userId,
            status: order.status,
            expiresAt: order.expiresAt.toISOString()
        })

        console.log("Order created event published");

        res.status(201).send(order);
    } catch (error) {
        next(error);
    }
}

export { createOrder };

