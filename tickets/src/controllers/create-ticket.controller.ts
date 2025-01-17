import { RequestValidationError } from "@ksticketinservice/common";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Ticket } from "../models/ticket.model";

export const createTicketController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
    console.log(errors.array())
    if(!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    const { title, price } = req.body;
    const userId = req.currentUser!.id as string;
    const ticket = Ticket.build({ title, price, userId });
    await ticket.save();
    res.status(201).send({ title, price });
    } catch (error) {
        next(error)
    }
}