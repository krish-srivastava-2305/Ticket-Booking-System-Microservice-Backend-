import { Router } from "express";
import { getTicketsController } from "../controllers/get-tickets.controller";

const router = Router();

router.get("/", getTicketsController);

export { router as getTicketsRouter };
