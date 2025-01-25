import { RequestValidationError } from "@ksticketinservice/common";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Ticket } from "../models/ticket.model";
import { TicketPublisher } from "../events/publishers";
import { natsWrapper } from "../events/init";

export const createTicketController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    const { title, price } = req.body;
    const userId = req.currentUser!.id as string;

    const ticket = Ticket.build({ title, price, userId, version: 1 });
    await ticket.save();

    new TicketPublisher(natsWrapper.client).publish("ticket.created", {
        id: ticket._id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: ticket.version
    });

    res.status(201).send({ title, price, id: ticket._id });
    } catch (error) {
        next(error)
    }
}