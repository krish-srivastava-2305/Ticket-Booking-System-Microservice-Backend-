import { NotFoundError, RequestValidationError } from "@ksticketinservice/common";
import { validationResult } from "express-validator";
import { Ticket } from "../models/ticket.model";
import { Request, Response, NextFunction } from "express"

export const getTicketByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw new RequestValidationError(errors.array());
        }
        const id = req.params.id;
        const ticket = await Ticket.findById(id);
        if(!ticket){
            throw new NotFoundError()
        }
        res.status(200).send({ticket})

    } catch (error) {
        next(error)
    }
}