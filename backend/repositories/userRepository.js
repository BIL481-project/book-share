const { sequelize } = require("../config/database/db");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const User = models.users;

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

const findUser = async (filters = {}) => {
    try {
        const user = await User.findOne(filters);
        return user;

    } catch (error) {
        throw new Error('Error in findUser: ' + error.message);
    }
};

const updateUser = async (filters = {}, userData) => {
    try {
        const user = await User.findOne({
            where: filters
        });
        await user.update(userData);
        return user;

    } catch (error) {
        throw new Error('Error in updateUser: ' + error.message);
    }
};

const deleteUser = async (filters = {}) => {
    try {
        const user = await User.findOne({
            where: filters
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
    findUser,
    updateUser,
    deleteUser
};