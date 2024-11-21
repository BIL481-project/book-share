const UserService = require('../services/userService');

const createUser = async (req, res) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {

}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserServiec.getAllUsers();
        return users;

    } catch (error) {
        throw error;
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await UserService.updateUser(req.params.email, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getUser,
    updateUser,
};
