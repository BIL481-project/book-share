const UserService = require('./userService');
const BookService = require('./bookService');

const getUserProfile = async (userName) => {
    try {
        const user = await UserService.getUserByUserName(userName);
        if (!user) {
            throw new Error('User not found');
        }

        const ownedBooks = await BookService.getAllBooks({
            where: { ownedId: user.id }
        });
        const borrowedBooks = await BookService.getAllBooks({
            where: { borrowerId: user.id }
        });

        return {
            user,
            ownedBooks,
            borrowedBooks,
        };

    } catch (error) {
        throw new Error(`Error fetching user profile: ${error.message}`);
    }
};

module.exports = {
    getUserProfile,
};
