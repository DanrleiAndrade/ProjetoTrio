import { Router } from "express";
import BookController from "../controller/books.controller";
import { verifyToken } from "../jwt/jwt";

const control = new BookController();

const bookRouter = Router();

bookRouter.get('/book', control.get.bind(control));
bookRouter.post('/book', control.create.bind(control));
bookRouter.patch('/wishlist/:bookId', verifyToken, control.wishlist.bind(control));

export default bookRouter;