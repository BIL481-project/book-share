const RepositoryError = require("../errors/RepositoryError");
const { Book } = require('../models/index');

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

const updateBook = async (filters = {}, updateData, transaction = null) => {
    try {
        const options = { ...filters };
        if (transaction) {
            options.transaction = transaction; // Transaction'ı ekle
        }

        const [rowsUpdated] = await Book.update(updateData, options); // Satırları güncelle
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
