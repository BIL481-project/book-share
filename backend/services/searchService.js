const BookService = require('./bookService');
const { Op } = require('sequelize'); // Sequelize'den Op'u import edin

const search = async (input) => {
    try {
        const books = await BookService.getAllBooks({
            where: {
                name: { // `title` veritaban�nda kitap ad� s�tunu
                    [Op.like]: `%${input}%`, // `Op.like` Sequelize kullan�m�d�r.
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