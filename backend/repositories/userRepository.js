const { sequelize } = require("../config/database/db");
const RepositoryError = require("../errors/RepositoryError");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const User = models.users;

const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw new RepositoryError('Error creating user: ' + error.message);
    }
};

const findAllUsers = async (filters = {}) => {
    try {
        const users = await User.findAll(filters);
        return users;
    } catch (error) {
        throw new RepositoryError('Error finding all users: ' + error.message);
    }
};

const findUser = async (filters = {}) => {
    try {
        const user = await User.findOne(filters);
        return user;
    } catch (error) {
        throw new RepositoryError('Error finding user: ' + error.message);
    }
};

const updateUser = async (filters = {}, userData) => {
    try {
        const user = await User.findOne(filters);
        await user.update(userData);
        return user;
    } catch (error) {
        throw new RepositoryError('Error updating user: ' + error.message);
    }
};

const deleteUser = async (filters = {}) => {
    try {
        const user = await User.findOne(filters);
        await user.destroy();
        return user;

    } catch (error) {
        throw new RepositoryError('Error deleting user: ' + error.message);
    }
};

module.exports = {
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteUser
};