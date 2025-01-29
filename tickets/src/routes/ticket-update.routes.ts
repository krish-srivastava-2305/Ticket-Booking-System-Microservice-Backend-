import { Router } from "express";
import { body, param } from "express-validator";
import { authUser } from "@ksticketinservice/common";
import { ticketUpdateController } from "../controllers/ticket-update.controller";

const router = Router();

router.put("/:id",
    [
        param("id").isMongoId().withMessage("No Ticket ID found"),
        body("title").notEmpty().withMessage("Title is required"),
        body("price").notEmpty().isFloat({gt: 0}).withMessage("Price must be greater than 0")
    ],
    authUser,
    ticketUpdateController
)

export { router as ticketUpdateRouter };
