import { BadRequestErroor, NotFoundError, RequestValidationError } from "@ksticketinservice/common";
import { Ticket } from "../models/ticket.model";
import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator";
import { TicketPublisher } from "../events/publishers";
import { natsWrapper } from "../events/init";

export const ticketUpdateController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Validate the request     
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw new RequestValidationError(errors.array());
        }

        // 2. Get the ticket id and the new data
        const id = req.params.id;
        const {title, price} = req.body;

        // 3. Find the ticket and check if it exists
        const ticket = await Ticket.findById(id);
        if(!ticket){
            throw new NotFoundError()
        }

        // 4. Check if the user is the owner of the ticket
        const user = req.currentUser?.id;
        if(ticket.userId !== user){
            throw new BadRequestErroor("You are not authorized to update this ticket")
        }

        // 5. Update the ticket
        ticket.set({title, price, version: ticket.version + 1});
        await ticket.save();

        // 6. Publish the ticket updated event
        new TicketPublisher(natsWrapper.client).publish("ticket.updated", {
            id: ticket._id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            version: ticket.version
        });

        // 7. Send the updated ticket
        res.status(200).send({ticket})
    } catch (error) {
        next(error)
    }
}