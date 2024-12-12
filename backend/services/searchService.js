const UserService = require('./userService');
const BookService = require('./bookService');
const { Op } = require('sequelize'); // Sequelize'den Op'u import edin

const search = async (input, option) => {
    try {
        if (option === "book") {
            const books = await BookService.getAllBooks({
                where: {
                    name: { // `title` veritabanýnda kitap adý sütunu
                        [Op.like]: `%${input}%`, // `Op.like` Sequelize kullanýmýdýr.
                    },
                },
            });
            return books;
        }

        else if (option === "user") {
            const users = await UserService.getAllUsers({
                where: {
                    userName: { // `title` veritabanýnda kitap adý sütunu
                        [Op.like]: `%${input}%`, // `Op.like` Sequelize kullanýmýdýr.
                    },
                },
            });
            return users;
        }

        return [];
    } catch (error) {
        console.error('Error in search:', error);
        throw new Error('Search operation failed');
    }
};

module.exports = {
    search
};