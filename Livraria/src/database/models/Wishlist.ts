import { Model } from "sequelize";
import sequelize from "sequelize";
import db from '.'
import Book from "./Book";
import User from "./User";


class Wishlist extends Model {
    declare userId: number
    declare bookId: number
}

Wishlist.init({
    bookId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'book',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      userId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
}, {
    sequelize: db,
    tableName: 'wishlist',
    underscored: true,
    timestamps: false
})

Book.belongsToMany(User, {
    foreignKey: 'bookId',
    otherKey: 'userId',
    as: 'users',
    through: Wishlist
})

User.belongsToMany(Book, {
    foreignKey: 'userId',
    otherKey: 'bookId',
    as: 'books',
    through: Wishlist
})

export default Wishlist;