const UserRepository = require('../repositories/userRepository');
const User = require('../models/users');

jest.mock('../models/users'); // User modelini mock'la

describe('userRepository Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Ba�ar�l� kullan�c� olu�turma testi
    it('should create a new user', async () => {
        const mockUserData = { userName: 'sample', email: 'sample@example.com', password: 'password' };

        // User.create metodunu mock'layarak ba�ar� durumu d�nd�rme
        User.create.mockResolvedValue({
            id: 1,
            userName: 'sample',
            email: 'sample@example.com',
            password: 'password'
        });

        const user = await UserRepository.createUser(mockUserData);

        // Beklenen sonu�lar� kontrol et
        expect(user).toHaveProperty('id', 1);
        expect(user.userName).toBe('sample');
        expect(user.email).toBe('sample@example.com');
        expect(user.password).toBe('password');
    });

    // Hata durumunda test
    it('should throw an error if user creation fails', async () => {
        const mockUserData = { userName: 'sample', email: 'sample@example.com', password: 'password' };

        // User.create metodunu mock'layarak hata durumu d�nd�rme
        User.create.mockRejectedValue(new Error('Some error'));

        // Hata f�rlat�ld���n� kontrol et
        await expect(UserRepository.createUser(mockUserData)).rejects.toThrow('Error in createUser(): Some error');
    });

    it('should find the user', async () => {
        User.findByPk.mockResolvedValue({
            id: 1,
            userName: 'sample',
            email: 'sample@example.com',
            password: 'password'
        });

        const user = await UserRepository.findUserById(1);

        expect(user).toHaveProperty('id', 1);
        expect(user.userName).toBe('sample');
        expect(user.email).toBe('sample@example.com');
        expect(user.password).toBe('password');
    });

    it('should delete the user', async () => {
        User.deleteUser.mockResolvedValue({
            id: 1,
            userName: 'sample',
            email: 'sample@example.com',
            password: 'password'
        });

        await UserRepository.deleteUser(1);

        // Teste ba�lamak i�in yan�t�n do�ru oldu�undan emin olun
        expect(result).toHaveProperty('message', 'User deleted successfully');
    });

});

