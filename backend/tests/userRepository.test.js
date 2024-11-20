const UserRepository = require('../repositories/userRepository');
const User = require('../models/users');

jest.mock('../models/users');
const mockUserData = { userName: 'sample', email: 'sample@example.com', password: 'password' };

describe('userRepository Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new user', async () => {
        User.create.mockResolvedValue({
            id: 1,
            userName: 'sample',
            email: 'sample@example.com',
            password: 'password'
        });

        const user = await UserRepository.createUser(mockUserData);

        await expect(user).toHaveProperty('id', 1);
        await expect(user.userName).toBe('sample');
        await expect(user.email).toBe('sample@example.com');
        await expect(user.password).toBe('password');
    });

    it('should throw an error if user creation fails', async () => {
        User.create.mockRejectedValue(new Error('Some error'));

        await expect(UserRepository.createUser(mockUserData)).rejects.toThrow('Error in createUser: Some error');
    });

    it('should find the user by user name', async () => {
        User.findOne.mockResolvedValue({
            id: 1,
            userName: 'sample',
            email: 'sample@example.com',
            password: 'password'
        });

        const user = await UserRepository.findUserByUserName('sample');

        expect(user).toHaveProperty('id', 1);
        expect(user.userName).toBe('sample');
        expect(user.email).toBe('sample@example.com');
        expect(user.password).toBe('password');
    });

    it('should delete the user', async () => {
        User.findOne.mockResolvedValue({
            id: 1,
            userName: 'sample',
            email: 'sample@example.com',
            password: 'password',
            destroy: jest.fn().mockResolvedValue(1), //static function mocklama 
        });

        const user = await UserRepository.deleteUser('sample@example.com');

        expect(user).toHaveProperty('id', 1);
        expect(user.userName).toBe('sample');
        expect(user.email).toBe('sample@example.com');
        expect(user.password).toBe('password');
    });

});

