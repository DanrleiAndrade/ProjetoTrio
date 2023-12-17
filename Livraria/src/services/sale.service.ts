import Sale from "../database/models/Sale";
import { ModelStatic } from "sequelize";
import BookSale from "../database/models/BookSale";
import Book from "../database/models/Book";
import { resp, respM } from "../utils/resp";
import schema from "./validations/schema";
import ISale from "../interfaces/ISale";

BookSale.associations;

class SaleService {
    private model: ModelStatic<Sale> = Sale;

    async get(userId: number) {
        const config = { include: [{ model: Book, as: 'books' }] }


        const sales = await this.model.findAll({
            where: { userId: userId },
            ...config
        })

        return resp(200, sales);
    }

    async create(sale: ISale){
        const { error } = schema.sale.validate(sale);
        if (error) return respM(422, error.message);

        const books = await Promise.all(sale.books!.map(async(e) => {
            return await Book.findByPk(e.bookId)
        }))

        if(books.some((e) => !e)) {
            return respM(404, 'Book not found')
        }

        const createdSale = await this.model.create({ ...sale })

        const bookSale = sale.books!.map((e) => ({
            ...e,
            saleId: createdSale.id
        }))

        await BookSale.bulkCreate(bookSale);

        return resp(201, createdSale)
    }
}

export default SaleService;