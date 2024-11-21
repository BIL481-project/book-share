const { User } = require('../models/init-models')(require('../config/database/db').sequelize);

const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;

    } catch (error) {
        throw new Error('Error in createUser: ' + error.message);
    }
};

const findAllUsers = async () => {
    try {
        const users = await User.findAll();
        return users;

    } catch (error) {
        throw new Error('Error in findAllUsers: ' + error.message);
    }
};

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            where: { email } // username'� unique alan olarak kullan�yoruz
        });
        return user;

    } catch (error) {
        throw new Error('Error in findUserByEmail: ' + error.message);
    }
};

const findUserByUserName = async (userName) => {
    try {
        const user = await User.findOne({
            where: { userName }
        });
        return user;

    } catch (error) {
        throw new Error('Error in findUserByUserName: ' + error.message);
    }
}

const updateUser = async (email, userData) => {
    try {
        const user = await User.findOne({
            where: { email }
        });
        await user.update(userData);
        return user;

    } catch (error) {
        throw new Error('Error in updateUser: ' + error.message);
    }
};

const deleteUser = async (email) => {
    try {
        const user = await User.findOne({
            where: { email }
        });
        await user.destroy();
        return user;

    } catch (error) {
        throw new Error('Error in deleteUser: ' + error.message);
    }
};

module.exports = {
    createUser,
    findAllUsers,
    findUserByEmail,
    findUserByUserName,
    updateUser,
    deleteUser
};