const AuthRepository = require('../../repositories/authRepository');
const { User } = require('../../models/index');

jest.mock('../models/index', () => {
    return {
        User: {
            findOne: jest.fn(), // Mock findOne fonksiyonu
            create: jest.fn(),  // Mock create fonksiyonu
        },
    };
});

describe('AuthRepository - findUserByEmail', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });      

    it('should return a user when email exists', async () => {
        User.findOne.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword123',
            userName: 'testuser',
        });

        const user = await AuthRepository.findUserByEmail('test@example.com');
        expect(user).toBeDefined();
        expect(user.email).toBe('test@example.com');
        expect(user.password).toBe('hashedpassword123');
    });


    it('should throw an error when user does not exist', async () => {
        User.findOne.mockResolvedValue(null);

        await expect(AuthRepository.findUserByEmail('nonexistent@example.com')).rejects.toThrow('User not found');
    });


    it('should throw an error when a database connection error occurs', async () => {
        // Veritabanı bağlantı hatasını simüle ediyoruz
        User.findOne.mockRejectedValue(new Error('Database connection error'));

        // Beklenen hata mesajını doğruluyoruz
        await expect(AuthRepository.findUserByEmail('test@example.com')).rejects.toThrow(
            'Database connection error'
        );
    });
});    


describe('AuthRepository - createUser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
        

    it('should create and return a user successfully', async() => {
        const mockUserData = {
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword123',
            userName: 'testuser',
        };
        
        User.create.mockResolvedValue(mockUserData);

        const userData = {
            email: 'test@example.com',
            password: 'hashedpassword123',
            userName: 'testuser',
        };

        const createdUser = await AuthRepository.createUser(userData);

        expect(User.create).toHaveBeenCalledWith(userData);

        expect(createdUser.email).toBe(mockUserData.email);
        expect(createdUser.password).toBe(mockUserData.password);
        expect(createdUser.userName).toBe(mockUserData.userName);
        expect(createdUser.id).toBe(mockUserData.id);
    });


    it('should throw a unique constraint error if email is already in use', async () => {
        const uniqueConstraintError = new Error('Unique constraint error');
        User.create.mockRejectedValue(uniqueConstraintError);
    
        // Aynı email ile createUser çağrıldığında hata bekliyoruz
        const duplicateUserData = {
          email: 'test@example.com',
          password: 'hashedpassword123',
          userName: 'testuser',
        };

        await expect(AuthRepository.createUser(duplicateUserData)).rejects.toThrow('Unique constraint error');
    
        // User.create'in çağrıldığını doğruluyoruz
        expect(User.create).toHaveBeenCalledWith(duplicateUserData);
      });


    it('should throw a database error on unexpected failure', async () => {
        // Mock: Veritabanı bağlantı hatasını simüle ediyoruz
        const databaseError = new Error('Database connection failed');
        User.create.mockRejectedValue(databaseError);
    
        // createUser çağrıldığında hata bekliyoruz
        const userData = {
            email: 'test@example.com',
            password: 'hashedpassword123',
            userName: 'testuser',
        };

        await expect(AuthRepository.createUser(userData)).rejects.toThrow('Database connection failed');
    
        // User.create'in çağrıldığını doğruluyoruz
        expect(User.create).toHaveBeenCalledWith(userData);
    });
});