import { Router } from "express";
import BookController from "../controller/books.controller";

const control = new BookController();

const bookRouter = Router();

bookRouter.get('/book', control.get.bind(control));
bookRouter.post('/book', control.create.bind(control));

export default bookRouter;