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

describe('BookService.lendBook', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Her testten sonra mockları temizle
  });

  it('should throw an error if the book is not found', async () => {
    const bookId = 99; // Bulunamayacak bir ID
    const borrowerId = 2;

    await expect(BookService.lendBook(bookId, borrowerId)).rejects.toThrow('Book not found.');
    expect(BookRepository.findBook).toHaveBeenCalledWith({ where: { id: bookId } });
  });

  it('should throw an error if the book is not available', async () => {
    BookRepository.findBook.mockResolvedValueOnce({
      id: 1,
      isAvailable: false, // Ödünç verilemez
    });

    const bookId = 1;
    const borrowerId = 2;

    await expect(BookService.lendBook(bookId, borrowerId)).rejects.toThrow('Book is not available for lending.');
    expect(BookRepository.findBook).toHaveBeenCalledWith({ where: { id: bookId } });
  });

  it('should successfully lend the book', async () => {
    const mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn(),
    };
    sequelize.transaction.mockResolvedValue(mockTransaction);

    BookRepository.findBook.mockResolvedValueOnce({
      id: 1,
      isAvailable: true,
      ownerId: 1,
    });

    const bookId = 1;
    const borrowerId = 2;

    const result = await BookService.lendBook(bookId, borrowerId);

    expect(result).toEqual({ success: true, message: 'Book successfully lent.' });
    expect(BookRepository.updateBook).toHaveBeenCalledWith(
      { where: { id: bookId } },
      { borrowerId, isAvailable: 0 },
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
      isAvailable: true,
    });

    BookRepository.updateBook.mockRejectedValue(new Error('Update failed'));

    const bookId = 1;
    const borrowerId = 2;

    await expect(BookService.lendBook(bookId, borrowerId)).rejects.toThrow('Error in lendBook service: Update failed');

    expect(mockTransaction.rollback).toHaveBeenCalled(); // Rollback çağrılmış mı kontrol et
  });
});
