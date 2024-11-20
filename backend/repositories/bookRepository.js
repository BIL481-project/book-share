const Book = require('../models/books');

const createBook = async (bookData) => {
    try {
        const book = await Book.create(userBook);
        return book;
    } catch (error) {
        throw new Error('Error in createBook: ' + error.message);
    }
};

const findAllBooks = async () => {
    try {
        const books = await Book.findAll();
        return books;
    } catch (error) {
        throw new Error('Error in findAllBooks: ' + error.message);
    }
};

const findBookById = async (id) => {
    try {
        const book = await Book.findByPk(id);
        return book;
    } catch (error) {
        throw new Error('Error in findBookByEmail: ' + error.message);
    }
};

const findBooksByUserId = async (id) => {
    try {
        const book = await Book.findMany(
            where: { id }
        );
        return book;
    } catch (error) {
        throw new Error('Error in findBookByEmail: ' + error.message);
    }
};

const updateBook = async (email, bookData) => {
    try {
        const book = await Book.findByPk(id);
        await book.update(bookData);
        return book;
    } catch (error) {
        throw new Error('Error in updateBook: ' + error.message);
    }
};

const deleteBook = async (id) => {
    try {
        const book = await Book.findByPk(id);
        await book.destroy();
        return book;
    } catch (error) {
        throw new Error('Error in updateBook: ' + error.message);
    }
};

module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    updateUser,
    deleteUser
};