import { Router } from "express";
import { getUserController } from "../controllers/get-user.controller";
const router = Router();

router.get("/get-user", getUserController)

export { router as getUserRouter };