const BookService = require('../services/bookService');
const BookRepository = require('../repositories/bookRepository');
const { sequelize } = require('../config/database/db');

jest.mock('../repositories/bookRepository', () => require('./mocks/bookRepositoryMock')); // Mock BookRepository
jest.mock('../config/database/db', () => ({
  sequelize: {
    transaction: jest.fn(() => ({
      commit: jest.fn(),
      rollback: jest.fn(),
    })),
  },
}));

describe('BookService.returnBook', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Her testten sonra mockları temizle
  });

  it('should throw an error if the book is not found', async () => {
    const bookId = 99; // Bulunamayacak bir ID
    const userId = 2;

    await expect(BookService.returnBook(bookId, userId)).rejects.toThrow('Book not found.');
    expect(BookRepository.findBook).toHaveBeenCalledWith({ where: { id: bookId } });
  });

  it('should throw an error if the user did not borrow the book', async () => {
    BookRepository.findBook.mockResolvedValueOnce({
      id: 1,
      borrowerId: 3, // Başka bir kullanıcı ödünç almış
    });

    const bookId = 1;
    const userId = 2;

    await expect(BookService.returnBook(bookId, userId)).rejects.toThrow(
      'You cannot return a book you did not borrow.'
    );
    expect(BookRepository.findBook).toHaveBeenCalledWith({ where: { id: bookId } });
  });

  it('should successfully return the book', async () => {
    const mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn(),
    };
    sequelize.transaction.mockResolvedValue(mockTransaction);

    BookRepository.findBook.mockResolvedValueOnce({
      id: 1,
      borrowerId: 2, // Kitabı iade etmeye çalışan kullanıcı doğru
      isAvailable: 0,
    });

    const bookId = 1;
    const userId = 2;

    const result = await BookService.returnBook(bookId, userId);

    expect(result).toEqual({ success: true, message: 'Book successfully returned.' });
    expect(BookRepository.updateBook).toHaveBeenCalledWith(
      { where: { id: bookId } },
      { borrowerId: null, isAvailable: 1 },
      mockTransaction
    );
    expect(mockTransaction.commit).toHaveBeenCalled();
  });

  it('should rollback the transaction on failure', async () => {
    const mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn(),
    };
    sequelize.transaction.mockResolvedValue(mockTransaction);

    BookRepository.findBook.mockResolvedValueOnce({
      id: 1,
      borrowerId: 2, // Kullanıcı ödünç almış
    });

    BookRepository.updateBook.mockRejectedValue(new Error('Update failed')); // Güncelleme hatası

    const bookId = 1;
    const userId = 2;

    await expect(BookService.returnBook(bookId, userId)).rejects.toThrow(
      'Error in returnBook service: Update failed'
    );

    expect(mockTransaction.rollback).toHaveBeenCalled(); // Rollback çağrılmış mı kontrol et
  });
});
