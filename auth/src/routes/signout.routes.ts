import { Router } from "express";
import { signoutController } from "../controllers/signout.controller";
import { currentUserMiddleware } from "@ksticketinservice/common";
import { authUser } from "@ksticketinservice/common";
const router = Router();

router.post("/signout", currentUserMiddleware, authUser,signoutController)

export { router as signoutRouter };