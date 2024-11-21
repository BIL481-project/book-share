const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const AuthRepository = require('../repositories/authRepository');

const ServiceError = require('../errors/ServiceError');
const RepositoryError = require('../errors/RepositoryError');

const AuthService = {
    async signupUser(email, password, userName) {
        try {
            if (!email || !password || !userName) {
                throw new ServiceError('Validation error: Email, password and username are required.');
            }

            if (!validator.isEmail(email)) {
                throw new ServiceError('Invalid email format.');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await AuthRepository.createUser({ email, password: hashedPassword, userName });
            console.log('Kullanıcı başarıyla oluşturuldu:', newUser);
            return newUser;
        } catch (error) {
            throw error; // Hata controller katmanına iletiliyor
        }
    }, 

    async loginUser(email, password) {
        try {
            // 1. Girdi validasyonu
            if (!email || !password) {
                throw new ServiceError('Email and password are required.');
            }

            // 2. Kullanıcıyı email adresiyle bul
            const user = await AuthRepository.findUserByEmail(email);
            if (!user) {
                throw new ServiceError('There is no account with the email you provided.');
            }

            // 3. Şifre doğrulama
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new ServiceError('Wrong password.');
            }

            // 4. JWT oluşturma
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } // Token süresi
            );

            return { token, user };
        } catch (error) {
            if (error instanceof ServiceError || error instanceof RepositoryError) {
                throw error;
            }
            else{
                throw new ServiceError(error.message);
            }
        }
    }
};

module.exports = AuthService;
