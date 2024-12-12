const UserController = require('../../controllers/userController');
const UserService = require('../../services/userService');

jest.mock('../../services/userService');

describe('UserController', () => {
    describe('createUser', () => {
        it('should create a user and return the created user with status 201', async () => {
            const mockUser = {
                id: 1, name: 'John Doe',
                email: 'john@example.com'
            };
            UserService.createUser.mockResolvedValue(mockUser);

            const req = {
                body: {
                    name: 'John Doe',
                    email: 'john@example.com'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.createUser(req, res);

            expect(UserService.createUser).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return a 400 status with error message if creation fails', async () => {
            const errorMessage = 'User creation failed';
            UserService.createUser.mockRejectedValue(new Error(errorMessage));

            const req = {
                body: {
                    name: 'John Doe',
                    email: 'john@example.com'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.createUser(req, res);

            expect(UserService.createUser).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('getAllUsers', () => {
        it('should return all users', async () => {
            const mockUsers = [
                {
                    id: 1, name: 'John Doe',
                    email: 'john@example.com'
                },
                {
                    id: 2, name: 'Jane Smith',
                    email: 'jane@example.com'
                },
            ];
            UserService.getAllUsers.mockResolvedValue(mockUsers);

            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            const users = await UserController.getAllUsers(req, res);

            expect(UserService.getAllUsers).toHaveBeenCalled();
            expect(users).toEqual(mockUsers);
        });

        it('should throw an error if fetching users fails', async () => {
            const errorMessage = 'Failed to fetch users';
            UserService.getAllUsers.mockRejectedValue(new Error(errorMessage));

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await expect(UserController.getAllUsers(req, res)).rejects.toThrow(errorMessage);
            expect(UserService.getAllUsers).toHaveBeenCalled();
        });
    });

    describe('updateUser', () => {
        it('should update a user and return the updated user with status 200', async () => {
            const mockUpdatedUser = { id: 1, name: 'John Updated', email: 'john@example.com' };
            UserService.updateUser.mockResolvedValue(mockUpdatedUser);

            const req = {
                params: { email: 'john@example.com' },
                body: { name: 'John Updated' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.updateUser(req, res);

            expect(UserService.updateUser).toHaveBeenCalledWith('john@example.com', req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUpdatedUser);
        });

        it('should return 404 status with error message if user not found', async () => {
            const errorMessage = 'User not found';
            UserService.updateUser.mockRejectedValue(new Error(errorMessage));

            const req = {
                params: { email: 'john@example.com' },
                body: { name: 'John Updated' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.updateUser(req, res);

            expect(UserService.updateUser).toHaveBeenCalledWith('john@example.com', req.body);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });
});
