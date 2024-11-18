const RepositoryError = require('../../errors/RepositoryError');
const ServiceError = require('../../errors/ServiceError');
const AuthService = require('../services/AuthService');

const AuthController = {
    async signup(req, res) {
        try {
            const { email, password } = req.body;
            const newUser = await AuthService.signupUser(email, password);
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            if (error instanceof ServiceError) {
                console.error('Service katmanı hatası: ', error.message);
                return res.status(400).json({ error: error.message });
            }
            else if (error instanceof RepositoryError) {
                console.error('Repository katmanı hatası: ' + error.message);
                return res.status(500).json({ error: error.message });
            }
            console.error('Controller Katmanı: Bilinmeyen hata:', error.message);
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
};

module.exports = AuthController;
