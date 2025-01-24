import { Router } from "express";
import { getTicketByIdController } from "../controllers/get-ticket-id.controller";
import { authUser } from "@ksticketinservice/common";
import { param } from "express-validator";

const router = Router();

router.get("/get-ticket/:id",
    [
        param("id").isMongoId().withMessage("No Ticket ID found"),
    ],
    authUser,
    getTicketByIdController
);

export { router as getTicketIdRouter };

