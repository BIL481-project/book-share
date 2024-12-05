const RepositoryError = require('../errors/RepositoryError');
const ServiceError = require('../errors/ServiceError');
const AuthService = require('../services/authService');

const AuthController = {
    async signup(req, res) {
        try {
            const { email, password, userName } = req.body;
            const newUser = await AuthService.signupUser(email, password, userName);
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            if (error instanceof RepositoryError) {
                console.error('Repository katmanı hatası: ' + error.message);
                return res.status(500).json({ error: error.message });
            }
            if (error instanceof ServiceError) {
                console.error('Service katmanı hatası: ', error.message);
                return res.status(400).json({ error: error.message });
            }
            console.error('Controller Katmanı: Bilinmeyen hata:', error.message);
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Service katmanını çağır
            const { token, user } = await AuthService.loginUser(email, password);

            // Başarılı yanıt döndür
            res.status(200).json({ message: 'Login successful.', token, user });
        } catch (error) {
            if (error instanceof RepositoryError) {
                console.error('Repository katmanı hatası: ' + error.message);
                return res.status(500).json({ error: error.message });
            }
            if (error instanceof ServiceError) {
                console.error('Service katmanı hatası: ', error.message);
                return res.status(400).json({ error: error.message });
            }
            console.error('Controller Katmanı: Bilinmeyen hata:', error.message);
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    },

    async getMe(req, res) {
        try{
            const authHeader = req.headers['authorization'];
            const user = await AuthService.getCurrentUser(authHeader);
            res.status(200).json({ user: user });
        }    
        catch(error) {
            let statusCode = 500;

            if(error instanceof ServiceError) {
                statusCode = 401;
            }

            res.status(statusCode).json({ error: error.message});
        }
        
    },
};

module.exports = AuthController;
