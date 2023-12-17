import { Router } from "express";
import SaleController from "../controller/sale.controller";
import { verifyToken } from "../jwt/jwt";

const control = new SaleController();

const saleRouter = Router();

saleRouter.get('/sale', verifyToken, control.get.bind(control))

saleRouter.post('/sale', verifyToken, control.create.bind(control))


export default saleRouter;