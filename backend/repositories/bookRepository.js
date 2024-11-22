const { sequelize } = require("../config/database/db");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const Book = models.books;

const createBook = async (bookData) => {
    try {
        const book = await Book.create(bookData);
        return book;
    } catch (error) {
        throw new Error(`Error creating book: ${error.message}`);
    }
};

const findBookById = async (id) => {
    try {
        const book = await Book.findByPk(id);
        return book;
    } catch (error) {
        throw new Error(`Error finding book by ID: ${error.message}`);
    }
};

const findAllBooks = async (filters = {}) => {
    try {
        const books = await Book.findAll(filters);
        return books;
    } catch (error) {
        throw new Error(`Error finding books: ${error.message}`);
    }
};

const updateBookById = async (id, updateData) => {
    try {
        const [rowsUpdated] = await Book.update(updateData, {
            where: { id },
        });
        return rowsUpdated > 0;
    } catch (error) {
        throw new Error(`Error updating book by ID: ${error.message}`);
    }
};

const deleteBookById = async (id) => {
    try {
        const rowsDeleted = await Book.destroy({
            where: { id },
        });
        return rowsDeleted > 0;
    } catch (error) {
        throw new Error(`Error deleting book by ID: ${error.message}`);
    }
};

module.exports = {
    createBook,
    findBookById,
    findAllBooks,
    updateBookById,
    deleteBookById
};
