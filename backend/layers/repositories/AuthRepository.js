const RepositoryError = require('../../errors/RepositoryError');
const User = require('../../models/User');

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
    }
};

module.exports = AuthRepository;
