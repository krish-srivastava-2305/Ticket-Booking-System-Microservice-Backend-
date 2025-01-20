import { Router } from "express";
import { getTicketsController } from "../controllers/get-tickets.controller";

const router = Router();

router.get("/get-tickets", getTicketsController);

export { router as getTicketsRouter };
