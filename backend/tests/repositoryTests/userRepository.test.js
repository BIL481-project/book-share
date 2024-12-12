const { createUser, findAllUsers, findUser, updateUser, deleteUser } = require('../../repositories/userRepository');
const { User } = require('../../models/index');
const RepositoryError = require('../../errors/RepositoryError');

jest.mock('../../models/index', () => ({
    User: {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
    },
}));

describe('User Repository Tests', () => {
    describe('createUser', () => {
        it('should create and return a user', async () => {
            const mockUserData = { name: 'John Doe', email: 'john@example.com' };
            const mockUser = { id: 1, ...mockUserData };
            User.create.mockResolvedValue(mockUser);

            const result = await createUser(mockUserData);

            expect(User.create).toHaveBeenCalledWith(mockUserData);
            expect(result).toEqual(mockUser);
        });

        it('should throw RepositoryError on failure', async () => {
            User.create.mockRejectedValue(new Error('Database error'));

            await expect(createUser({ name: 'John' })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findAllUsers', () => {
        it('should return all users', async () => {
            const mockUsers = [
                { id: 1, name: 'User 1' },
                { id: 2, name: 'User 2' },
            ];
            User.findAll.mockResolvedValue(mockUsers);

            const result = await findAllUsers();

            expect(User.findAll).toHaveBeenCalledWith({});
            expect(result).toEqual(mockUsers);
        });

        it('should throw RepositoryError on failure', async () => {
            User.findAll.mockRejectedValue(new Error('Database error'));

            await expect(findAllUsers()).rejects.toThrow(RepositoryError);
        });
    });

    describe('findUser', () => {
        it('should find and return a user', async () => {
            const mockFilters = { where: { id: 1 } };
            const mockUser = { id: 1, name: 'John Doe' };
            User.findOne.mockResolvedValue(mockUser);

            const result = await findUser(mockFilters);

            expect(User.findOne).toHaveBeenCalledWith(mockFilters);
            expect(result).toEqual(mockUser);
        });

        it('should throw RepositoryError on failure', async () => {
            User.findOne.mockRejectedValue(new Error('Database error'));

            await expect(findUser({ where: { id: 1 } })).rejects.toThrow(RepositoryError);
        });
    });

    describe('updateUser', () => {
        it('should update a user and return it', async () => {
            const mockFilters = { where: { id: 1 } };
            const mockUser = { id: 1, name: 'Old Name', update: jest.fn() };
            const mockUpdatedData = { name: 'New Name' };

            mockUser.update.mockResolvedValue();
            User.findOne.mockResolvedValue(mockUser);

            const result = await updateUser(mockFilters, mockUpdatedData);

            expect(User.findOne).toHaveBeenCalledWith(mockFilters);
            expect(mockUser.update).toHaveBeenCalledWith(mockUpdatedData);
            expect(result).toEqual(mockUser);
        });

        it('should throw RepositoryError on failure', async () => {
            User.findOne.mockRejectedValue(new Error('Database error'));

            await expect(updateUser({ where: { id: 1 } }, { name: 'New Name' })).rejects.toThrow(RepositoryError);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user and return it', async () => {
            const mockFilters = { where: { id: 1 } };
            const mockUser = { id: 1, name: 'John Doe', destroy: jest.fn() };

            mockUser.destroy.mockResolvedValue();
            User.findOne.mockResolvedValue(mockUser);

            const result = await deleteUser(mockFilters);

            expect(User.findOne).toHaveBeenCalledWith(mockFilters);
            expect(mockUser.destroy).toHaveBeenCalled();
            expect(result).toEqual(mockUser);
        });

        it('should throw RepositoryError on failure', async () => {
            User.findOne.mockRejectedValue(new Error('Database error'));

            await expect(deleteUser({ where: { id: 1 } })).rejects.toThrow(RepositoryError);
        });
    });
});
