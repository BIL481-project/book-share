const { sequelize } = require("../config/database/db");
const RepositoryError = require("../errors/RepositoryError");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const Book = models.books;

const createBook = async (bookData) => {
    try {
        const book = await Book.create(bookData);
        return book;
    } catch (error) {
        throw new RepositoryError(`Error creating book: ${error.message}`);
    }
};

const findBook = async (filters = {}) => {
    try {
        const book = await Book.findOne(filters);
        return book;
    } catch (error) {
        throw new RepositoryError(`Error finding book: ${error.message}`);
    }
};

const findAllBooks = async (filters = {}) => {
    try {
        const books = await Book.findAll(filters);
        return books;
    } catch (error) {
        throw new RepositoryError(`Error finding all books: ${error.message}`);
    }
};

const updateBook = async (filters = {}, updateData) => {
    try {
        const rowsUpdated = await Book.update(updateData, filters);
        return rowsUpdated;
    } catch (error) {
        throw new RepositoryError(`Error updating book: ${error.message}`);
    }
};

const deleteBook = async (filters = {}) => {
    try {
        const rowsDeleted = await Book.destroy(filters);
        return rowsDeleted;
    } catch (error) {
        throw new RepositoryError(`Error deleting book: ${error.message}`);
    }
};

module.exports = {
    createBook,
    findBook,
    findAllBooks,
    updateBook,
    deleteBook
};
