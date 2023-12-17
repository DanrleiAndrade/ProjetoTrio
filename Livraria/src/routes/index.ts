import { Router } from "express";
import userRouter from "./userRouter";
import bookRouter from "./bookRoutes";

const router = Router();

router.use(userRouter)
router.use(bookRouter)

export default router;