import { Router } from "express";
import { signoutController } from "../controllers/signout.controller";
const router = Router();

router.post("/signout", signoutController)

export { router as signoutRouter };