const BookService = require('./bookService');
const { Op } = require('sequelize'); // Sequelize'den Op'u import edin

const search = async (input) => {
    try {
        const books = await BookService.getAllBooks({
            where: {
                name: { // `title` veritabanýnda kitap adý sütunu
                    [Op.like]: `%${input}%`, // `Op.like` Sequelize kullanýmýdýr.
                },
            },
        });
        return books;
    } catch (error) {
        console.error('Error in search:', error);
        throw new Error('Search operation failed');
    }
};

module.exports = {
    search
};