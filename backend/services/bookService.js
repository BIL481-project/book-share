const BookRepository = require('../repositories/bookRepository');

const createBook = async (bookData) => {
    try {
        const book = await BookRepository.createBook(bookData);
        return book;
    } catch (error) {
        throw new Error(`Error creating book: ${error.message}`);
    }
};

const getBookById = async (id) => {
    try {
        const book = await BookRepository.findBookById(id);
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

const updateBookById = async (id, updateData) => {
    try {
        const [rowsUpdated] = await BookRepository.updateBookById(updateData, {
            where: { id },
        });
        return rowsUpdated > 0;
    } catch (error) {
        throw new Error(`Error updating book by ID: ${error.message}`);
    }
};

const deleteBookById = async (id) => {
    try {
        const rowsDeleted = await BookRepository.deleteBookById({
            where: { id },
        });
        return rowsDeleted > 0;
    } catch (error) {
        throw new Error(`Error deleting book by ID: ${error.message}`);
    }
};

module.exports = {
    createBook,
    getBookById,
    getAllBooks,
    updateBookById,
    deleteBookById
};