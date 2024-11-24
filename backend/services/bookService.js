const BookRepository = require('../repositories/bookRepository');

const createBook = async (bookData) => {
    try {
        const book = await BookRepository.createBook(bookData);
        return book;
    } catch (error) {
        throw new Error(`Error creating book: ${error.message}`);
    }
};

const getBook = async (filters = {}) => {
    try {
        const book = await BookRepository.findBook(filters);
        return book;
    } catch (error) {
        throw new Error(`Error finding book by ID: ${error.message}`);
    }
};

const getAllBooks = async (filters = {}) => {
    try {
        const books = await BookRepository.findAllBooks(filters);
        return books;
    } catch (error) {
        throw new Error(`Error finding books: ${error.message}`);
    }
};

const updateBook = async (id, updateData) => {
    try {
        const [rowsUpdated] = await BookRepository.updateBook(updateData, {
            where: { id },
        });
        return rowsUpdated > 0;
    } catch (error) {
        throw new Error(`Error updating book by ID: ${error.message}`);
    }
};

const deleteBook = async (filters = {}) => {
    try {
        const rowsDeleted = await BookRepository.deleteBookById(filters);
        return rowsDeleted > 0;
    } catch (error) {
        throw new Error(`Error deleting book by ID: ${error.message}`);
    }
};

module.exports = {
    createBook,
    getBook,
    getAllBooks,
    updateBook,
    deleteBook,
};