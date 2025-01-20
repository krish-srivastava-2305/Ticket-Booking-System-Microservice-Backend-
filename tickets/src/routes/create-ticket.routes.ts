import { Router } from "express";
import { authUser } from "@ksticketinservice/common"
import { body } from "express-validator"
import { createTicketController } from "../controllers/create-ticket.controller"

const router = Router();

router.post("/create",
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0")
    ],
    authUser,
    createTicketController
);

export { router as createTicketRouter };