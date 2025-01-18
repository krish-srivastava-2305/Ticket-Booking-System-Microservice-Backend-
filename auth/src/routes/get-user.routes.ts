import { Router } from "express";
import { getUserController } from "../controllers/get-user.controller"
import { currentUserMiddleware } from "@ksticketinservice/common";
import { authUser } from "@ksticketinservice/common";
const router = Router();

router.get("/get-user", currentUserMiddleware, authUser, getUserController);

export { router as getUserRouter };