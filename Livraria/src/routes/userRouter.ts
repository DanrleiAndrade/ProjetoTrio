import { Router } from "express";
import UserController from "../controller/user.controller";

const control = new UserController();

const userRouter = Router();

userRouter.get('/user', control.get.bind(control));

export default userRouter;