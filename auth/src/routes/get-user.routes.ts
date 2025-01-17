import { Router } from "express";
import { getUserController } from "../controllers/get-user.controller"
import { currentUserMiddleware } from "../middlewares/current-user.middleware";
import { authUser } from "../middlewares/auth.middleware";
const router = Router();

router.get("/get-user", currentUserMiddleware, authUser, getUserController);

export { router as getUserRouter };