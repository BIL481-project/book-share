const RepositoryError = require('../errors/RepositoryError');
const { User } = require('../models/index');

const AuthRepository = {
    // Yeni kullanıcı oluştur
    async createUser(userData) {
        try {
            const newUser = await User.create(userData);
            return newUser;
        } catch (error) {
            console.log('Repository katmanında hata:');
            throw new RepositoryError(error.message);
        }
    },
    // Kullanıcıyı email adresine göre bul
    async findUserByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new RepositoryError('User not found.');
            }
            return user;
        } catch (error) {
            if(error instanceof RepositoryError) {
                throw error;
            }
            else {
                throw new RepositoryError(error.message);
            }
        }
    }
};

module.exports = AuthRepository;
