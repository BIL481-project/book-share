const AuthController = require('../../controllers/authController');
const AuthService = require('../../services/authService');
const RepositoryError = require('../../errors/RepositoryError');
const ServiceError = require('../../errors/ServiceError');

jest.mock('../../services/authService');

describe('AuthController', () => {
    let mockRequest, mockResponse;

    beforeEach(() => {
        mockRequest = {
            body: {},
            headers: {},
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('signup', () => {
        it('should return 201 and the new user when signup is successful', async () => {
            const newUser = {
                id: 1,
                email: 'test@example.com',
                userName: 'testuser'
            };
            AuthService.signupUser.mockResolvedValue(newUser);

            mockRequest.body = {
                email: 'test@example.com',
                password: 'securepassword',
                userName: 'testuser',
            };

            await AuthController.signup(mockRequest, mockResponse);

            expect(AuthService.signupUser).toHaveBeenCalledWith(
                'test@example.com',
                'securepassword',
                'testuser'
            );
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'User created successfully',
                user: newUser,
            });
        });

        it('should handle RepositoryError and return 500', async () => {
            AuthService.signupUser.mockRejectedValue(new RepositoryError('Database error'));

            mockRequest.body = {
                email: 'test@example.com',
                password: 'securepassword',
                userName: 'testuser',
            };

            await AuthController.signup(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: 'Database error',
            });
        });

        it('should handle ServiceError and return 400', async () => {
            AuthService.signupUser.mockRejectedValue(new ServiceError('Invalid data'));

            mockRequest.body = {
                email: 'test@example.com',
                password: 'securepassword',
                userName: 'testuser',
            };

            await AuthController.signup(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: 'Invalid data',
            });
        });
    });

    describe('login', () => {
        it('should return 200 and the token/user when login is successful', async () => {
            const loginResponse = {
                token: 'valid-token',
                user: {
                    id: 1,
                    email: 'test@example.com',
                    userName: 'testuser'
                },
            };
            AuthService.loginUser.mockResolvedValue(loginResponse);

            mockRequest.body = {
                email: 'test@example.com',
                password: 'securepassword',
            };

            await AuthController.login(mockRequest, mockResponse);

            expect(AuthService.loginUser).toHaveBeenCalledWith(
                'test@example.com',
                'securepassword'
            );
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Login successful.',
                token: 'valid-token',
                user: loginResponse.user,
            });
        });

        it('should handle ServiceError and return 400', async () => {
            AuthService.loginUser.mockRejectedValue(new ServiceError('Invalid credentials'));

            mockRequest.body = {
                email: 'test@example.com',
                password: 'wrongpassword',
            };

            await AuthController.login(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: 'Invalid credentials',
            });
        });
    });

    describe('getMe', () => {
        it('should return the current user when authorization is successful', async () => {
            const user = { id: 1, email: 'test@example.com', userName: 'testuser' };
            AuthService.getCurrentUser.mockResolvedValue(user);

            mockRequest.headers['authorization'] = 'Bearer valid-token';

            await AuthController.getMe(mockRequest, mockResponse);

            expect(AuthService.getCurrentUser).toHaveBeenCalledWith('Bearer valid-token');
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ user });
        });

        it('should return 401 when ServiceError occurs', async () => {
            AuthService.getCurrentUser.mockRejectedValue(new ServiceError('Unauthorized'));

            mockRequest.headers['authorization'] = 'Bearer invalid-token';

            await AuthController.getMe(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
        });
    });
});
