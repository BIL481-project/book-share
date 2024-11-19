// src/services/userService.js
const UserRepository = require('../repositories/userRepository'); // UserRepository import ediliyor
const { ValidationError } = require('sequelize');  // Sequelize'den ValidationError kullanýyoruz
const { NotFoundError, ConflictError } = require('../utils/errors'); // Özelleþtirilmiþ hata sýnýflarý (daha sonra açýklanacak)

// Kullanýcý oluþturma
const createUser = async (userData) => {
    try {
        const existingUser = await UserRepository.findUserByEmail(userData.email);
        if (existingUser) {
            throw new ConflictError('User with this email already exists');
        }
        const user = await UserRepository.createUser(userData);
        return user;

    } catch (error) {
        if (error instanceof ValidationError) {
            throw new Error('Validation error: ' + error.message);
        }
        throw error;  // Hata baþka bir türse, yukarýya iletilir
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

const getUserById = async (id) => {
    try {
        const user = await UserRepository.findUserById(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        return user;

    } catch (error) {
        throw error;
    }
};

// Kullanýcýyý güncelleme
const updateUser = async (id, userData) => {
    try {
        const user = await UserRepository.findUserById(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        const updatedUser = await UserRepository.updateUser(email, userData);
        return updatedUser;

    } catch (error) {
        throw error;
    }
};
    
// Kullanýcýyý güncelleme
const deleteUser = async (id, userData) => {
    try {
        const user = await UserRepository.deleteUser(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        // Kullanýcýyý güncelle
        const updatedUser = await UserRepository.updateUser(email, userData);
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};