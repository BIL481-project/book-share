const UserRepository = require('../repositories/userRepository');

const createUser = async (userData) => {
    try {
        const existingUser = await UserRepository.findUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const user = await UserRepository.createUser(userData);
        return user;

    } catch (error) {
        throw error;
    }
};

const getAllUsers = async () => {
    try {
        const users = await UserRepository.findAllUsers();
        return users;

    } catch (error) {
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        return user;

    } catch (error) {
        throw error;
    }
};

const getUserByUserName = async (userName) => {
    try {
        const user = await UserRepository.findUserByUserName(userName);
        if (!user) {
            throw new Error('User not found');
        }
        return user;

    } catch (error) {
        throw error;
    }
};

const updateUser = async (id, userData) => {
    try {
        const user = await UserRepository.findUserById(id);
        if (!user) {
            throw new Error('User not found');
        }
        const updatedUser = await UserRepository.updateUser(email, userData);
        return updatedUser;

    } catch (error) {
        throw error;
    }
};
    
const deleteUser = async (id, userData) => {
    try {
        const deletedUser = await UserRepository.deleteUser(id);
        if (!user) {
            throw new Error('User not found');
        }
        return deletedUser;

    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail,
    getUserByUserName,
    updateUser,
    deleteUser,
};