const NotificationService = require('./notificationService');
const ServiceError = require('../errors/ServiceError');
const RepositoryError = require('../errors/RepositoryError');
const BookRepository = require('../repositories/bookRepository');
const eventBus = require('../utils/eventBus');
const { sequelize } = require('../config/database/db');

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

const lendBook = async (bookId, borrowerId) => {
    const transaction = await sequelize.transaction();
    try {
        // Kitabın mevcut durumu kontrol edilir
        const book = await BookRepository.findBook({ where: { id: bookId } });

        if (!book) {
            throw new ServiceError('Book not found.');
        }

        if (book.ownerId == borrowerId) {
            throw new ServiceError('You cannot borrow your own book.');
        }

        if (!book.isAvailable) {
            throw new ServiceError('Book is not available for lending.');
        }

        const rowsUpdated = await BookRepository.updateBook(
            { where: { id: bookId } },
            { borrowerId, isAvailable: 0 },
            transaction 
        );

        if (rowsUpdated === 0) {
            throw new ServiceError('Book update failed. No rows were updated.');
        }

        const notificationDetails = {
            userId: book.ownerId,
            content: `Your book named "${book.name}" has been BORROWED by the user with the ID: ${borrowerId}`,
        };

        await NotificationService.addNotification(notificationDetails, transaction); // Bildirimi database'e ekle

        await transaction.commit();

        eventBus.emit('new-notification', { userId: book.ownerId, notificationDetails: {
            message: "Your book named " + book.name + " has been BORROWED by the user with the ID: " + borrowerId
        } });



        return { success: true, message: 'Book successfully lent.' };
    } catch (error) {
        await transaction.rollback();

        if (error instanceof ServiceError || error instanceof RepositoryError) {
            throw error;
        }
        throw new ServiceError(`Error in lendBook service: ${error.message}`);
    }
};

const returnBook = async (bookId, userId) => {
    const transaction = await sequelize.transaction(); // Transaction başlat
    try {
        // Kitabın mevcut durumunu kontrol et
        const book = await BookRepository.findBook({ where: { id: bookId } });

        if (!book) {
            throw new ServiceError('Book not found.');
        }

        if (book.borrowerId !== userId) {
            throw new ServiceError('You cannot return a book you did not borrow.');
        }

        // Kitabı güncelle
        const rowsUpdated = await BookRepository.updateBook(
            { where: { id: bookId } },
            { borrowerId: null, isAvailable: 1 }, // borrowerId null, isAvailable 1 yap
            transaction
        );

        if (rowsUpdated === 0) {
            throw new ServiceError('Book update failed. No rows were updated.');
        }

        const notificationDetails = {
            userId: book.ownerId,
            content: `Your book named "${book.name}" has been RETURNED by the user with the ID: ${borrowerId}`,
        };

        await NotificationService.addNotification(notificationDetails, transaction); // Bildirimi database'e ekle

        await transaction.commit(); // Transaction başarıyla tamamlandı

        eventBus.emit('new-notification', { userId: book.ownerId, notificationDetails: {
            message: "Your book named " + book.name + " has been RETURNED by the user with the ID: " + userId
        } });

        return { success: true, message: 'Book successfully returned.' };
    } catch (error) {
        await transaction.rollback(); // Hata durumunda transaction'ı geri al

        if (error instanceof ServiceError || error instanceof RepositoryError) {
            throw error;
        }
        throw new ServiceError(`Error in returnBook service: ${error.message}`);
    }
};


module.exports = {
    createBook,
    getBook,
    getAllBooks,
    updateBook,
    deleteBook,
    lendBook,
    returnBook,
};