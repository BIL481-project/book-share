const { createBook, findBook, findAllBooks, updateBook, deleteBook } = require('../../repositories/bookRepository');
const { Book } = require('../../models/index');
const RepositoryError = require('../../errors/RepositoryError');

jest.mock('../../models/index', () => ({
    Book: {
        create: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}));

describe('Book Repository Tests', () => {
    describe('createBook', () => {
        it('should create and return a book', async () => {
            const mockBookData = { title: 'Test Book', author: 'Test Author' };
            const mockBook = { id: 1, ...mockBookData };
            Book.create.mockResolvedValue(mockBook);

            const result = await createBook(mockBookData);

            expect(Book.create).toHaveBeenCalledWith(mockBookData);
            expect(result).toEqual(mockBook);
        });

        it('should throw RepositoryError on failure', async () => {
            const mockBookData = { title: 'Test Book', author: 'Test Author' };
            Book.create.mockRejectedValue(new Error('Database error'));

            await expect(createBook(mockBookData)).rejects.toThrow(RepositoryError);
        });
    });

    describe('findBook', () => {
        it('should return a book based on filters', async () => {
            const mockFilters = { where: { title: 'Test Book' } };
            const mockBook = { id: 1, title: 'Test Book', author: 'Test Author' };
            Book.findOne.mockResolvedValue(mockBook);

            const result = await findBook(mockFilters);

            expect(Book.findOne).toHaveBeenCalledWith(mockFilters);
            expect(result).toEqual(mockBook);
        });

        it('should throw RepositoryError on failure', async () => {
            Book.findOne.mockRejectedValue(new Error('Database error'));

            await expect(findBook({ where: { title: 'Test Book' } })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findAllBooks', () => {
        it('should return all books based on filters', async () => {
            const mockFilters = { where: { author: 'Test Author' } };
            const mockBooks = [{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }];
            Book.findAll.mockResolvedValue(mockBooks);

            const result = await findAllBooks(mockFilters);

            expect(Book.findAll).toHaveBeenCalledWith(mockFilters);
            expect(result).toEqual(mockBooks);
        });

        it('should throw RepositoryError on failure', async () => {
            Book.findAll.mockRejectedValue(new Error('Database error'));

            await expect(findAllBooks({ where: { author: 'Test Author' } })).rejects.toThrow(RepositoryError);
        });
    });

    describe('updateBook', () => {
        it('should update books and return the number of rows updated', async () => {
            const mockFilters = { where: { id: 1 } };
            const mockUpdateData = { title: 'Updated Book' };
            Book.update.mockResolvedValue([1]);

            const result = await updateBook(mockFilters, mockUpdateData);

            expect(Book.update).toHaveBeenCalledWith(mockUpdateData, mockFilters);
            expect(result).toEqual(1);
        });

        it('should throw RepositoryError on failure', async () => {
            Book.update.mockRejectedValue(new Error('Database error'));

            await expect(updateBook({ where: { id: 1 } }, { title: 'Updated Book' })).rejects.toThrow(RepositoryError);
        });
    });

    describe('deleteBook', () => {
        it('should delete books and return the number of rows deleted', async () => {
            const mockFilters = { where: { id: 1 } };
            Book.destroy.mockResolvedValue(1);

            const result = await deleteBook(mockFilters);

            expect(Book.destroy).toHaveBeenCalledWith(mockFilters);
            expect(result).toEqual(1);
        });

        it('should throw RepositoryError on failure', async () => {
            Book.destroy.mockRejectedValue(new Error('Database error'));

            await expect(deleteBook({ where: { id: 1 } })).rejects.toThrow(RepositoryError);
        });
    });
});
