const User = require('../models/users');

const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw new Error('Error in createUser(): ' + error.message);
    }
};

const findAllUsers = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw new Error('Error in my findAllUsers: ' + error.message);
    }
};

const findUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        return user;
    } catch (error) {
        throw new Error('Error int findUserById(): ' + error.message);
    }
};

// Kullanýcý güncelleme
const updateUser = async (id, userData) => {
    try {
        const user = await User.findByPk(id);
        await user.update(userData);
        return user;
    } catch (error) {
        throw new Error('Error in updateUser(): ' + error.message);
    }
};

const deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        await user.destroy();
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error('Error in deleteUser(): ' + error.message);
    }
};

module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    updateUser,
    deleteUser
};