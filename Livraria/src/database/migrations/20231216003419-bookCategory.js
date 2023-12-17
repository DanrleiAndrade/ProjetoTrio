'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('bookCategory', {
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'book',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'category',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('bookCategory')
  }
};

