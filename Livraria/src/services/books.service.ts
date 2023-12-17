import { ModelStatic } from "sequelize";
import Book from "../database/models/Book";
import Category from "../database/models/Category";
import { resp, respM } from "../utils/resp";
import BookCategory from "../database/models/BookCategory";
import IBook from "../interfaces/IBook";
import schema from "./validations/schema";

BookCategory.associations

class BookService {
    private model: ModelStatic<Book> = Book;

    async get() {
        const books = await this.model.findAll({
            include: [{ model: Category, as: 'categories' }]
        })

        return resp(200, books)
    }

    async create(book: IBook) {
        const { error } = schema.book.validate(book)
        if (error) return respM(422, error.message);

        const createdBook = await this.model.create({ ...book })

        const categories = await Promise.all(book.categories!.map(async (e) => {
            return await Category.findByPk(e)
        }))

        if (categories.some((e) => !e)) return respM(404, 'Cathegory not found')

        const bookCategory = book.categories!.map((e) => ({
            bookId: createdBook.id,
            categoryId: e
        }))

        await BookCategory.bulkCreate(bookCategory)

        return resp(201, createdBook)
    }


}

export default BookService;