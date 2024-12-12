const { getUserProfile, getUserProfileByToken } = require('../../controllers/profileController');
const ProfileService = require('../../services/profileService');

jest.mock('../../services/profileService');

describe('ProfileController Tests', () => {
    describe('getUserProfile', () => {
        it('should return 400 if username is not provided', async () => {
            const req = { params: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await getUserProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Username is required' });
        });

        it('should return user profile if username is provided', async () => {
            const req = { params: { userName: 'testUser' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockProfile = { id: 1, userName: 'testUser' };
            ProfileService.getUserProfile.mockResolvedValue(mockProfile);

            await getUserProfile(req, res);

            expect(ProfileService.getUserProfile).toHaveBeenCalledWith({ where: { userName: 'testUser' } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProfile);
        });

        it('should handle errors properly', async () => {
            const req = { params: { userName: 'testUser' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const errorMessage = 'Something went wrong';
            ProfileService.getUserProfile.mockRejectedValue(new Error(errorMessage));

            await getUserProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe('getUserProfileByToken', () => {
        it('should return 400 if email is not provided', async () => {
            const req = { user: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await getUserProfileByToken(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'email is required' });
        });

        it('should return user profile if email is provided', async () => {
            const req = { user: { email: 'test@example.com' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockProfile = { id: 1, email: 'test@example.com' };
            ProfileService.getUserProfile.mockResolvedValue(mockProfile);

            await getUserProfileByToken(req, res);

            expect(ProfileService.getUserProfile).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProfile);
        });

        it('should handle errors properly', async () => {
            const req = { user: { email: 'test@example.com' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const errorMessage = 'Something went wrong';
            ProfileService.getUserProfile.mockRejectedValue(new Error(errorMessage));

            await getUserProfileByToken(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });
});
