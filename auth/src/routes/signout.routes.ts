import { Router } from "express";
import { signoutController } from "../controllers/signout.controller";
import { currentUserMiddleware } from "../middlewares/current-user.middleware";
import { authUser } from "../middlewares/auth.middleware";
const router = Router();

router.post("/signout", currentUserMiddleware, authUser,signoutController)

export { router as signoutRouter };