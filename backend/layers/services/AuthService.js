const bcrypt = require('bcrypt');
const AuthRepository = require('../repositories/AuthRepository');
const validator = require('validator');
const ServiceError = require('../../errors/ServiceError');

const AuthService = {
    async signupUser(email, password) {
        try {
            if (!email || !password) {
                throw new ServiceError('Validation error: Email and password are required.');
            }

            if (!validator.isEmail(email)) {
                throw new ServiceError('Invalid email format.');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await AuthRepository.createUser({ email, password: hashedPassword });
            console.log('Kullanıcı başarıyla oluşturuldu:', newUser);
            return newUser;
        } catch (error) {
            throw error; // Hata controller katmanına iletiliyor
        }
    }
};

module.exports = AuthService;
