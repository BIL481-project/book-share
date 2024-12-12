const BookController = require('../../controllers/bookController');
const BookService = require('../../services/bookService');
const RepositoryError = require('../../errors/RepositoryError');
const ServiceError = require('../../errors/ServiceError');

jest.mock('../../services/bookService');

describe('BookController', () => {
    describe('fetchBooks', () => {
        it('should fetch all books and return them as JSON', async () => {
            const mockBooks = [
                {
                    id: 1,
                    name: 'Book 1'
                },
                {
                    id: 2,
                    name: 'Book 2'
                },
            ];
            BookService.getAllBooks.mockResolvedValue(mockBooks);

            const req = {};
            const res = {
                json: jest.fn()
            };

            await BookController.fetchBooks(req, res);

            expect(BookService.getAllBooks).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockBooks);
        });
    });

    describe('getBook', () => {
        it('should return the book if found', async () => {
            const mockBook = { id: 1, name: 'Book 1' };
            BookService.getBook.mockResolvedValue(mockBook);

            const req = { params: { id: 1 } };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await BookController.getBook(req, res);

            expect(BookService.getBook).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(res.json).toHaveBeenCalledWith(mockBook);
        });

        it('should return 404 if the book is not found', async () => {
            BookService.getBook.mockResolvedValue(null);

            const req = { params: { id: 1 } };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await BookController.getBook(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
        });
    });

    describe('postBook', () => {
        it('should add a new book and return its ID', async () => {
            const createdBook = { id: 1 };
            BookService.createBook.mockResolvedValue(createdBook);

            const req = {
                body: { name: 'Book 1', description: 'A good book', genre: 'Fiction', location: 'Shelf 1' },
                user: { userId: 123 },
                file: { location: 'http://image.url' },
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await BookController.postBook[1](req, res);

            expect(BookService.createBook).toHaveBeenCalledWith({
                name: 'Book 1',
                description: 'A good book',
                genre: 'Fiction',
                location: 'Shelf 1',
                ownerId: 123,
                isAvailable: 1,
                borrowerId: null,
                image: 'http://image.url',
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Book added successfully!', id: 1 });
        });
    });

    describe('lendBook', () => {
        it('should lend a book successfully', async () => {
            BookService.lendBook.mockResolvedValue({ success: true, message: 'Book lent successfully' });

            const req = { params: { bookId: 1 }, user: { userId: 123 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await BookController.lendBook(req, res);

            expect(BookService.lendBook).toHaveBeenCalledWith(1, 123);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Book lent successfully' });
        });

        it('should return an error if lending fails', async () => {
            BookService.lendBook.mockRejectedValue(new ServiceError('Book is not available'));

            const req = { params: { bookId: 1 }, user: { userId: 123 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await BookController.lendBook(req, res);

            expect(BookService.lendBook).toHaveBeenCalledWith(1, 123);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Book is not available' });
        });
    });

    describe('returnBook', () => {
        it('should return a book successfully', async () => {
            BookService.returnBook.mockResolvedValue({ success: true, message: 'Book returned successfully' });

            const req = {
                params: {
                    bookId: 1
                },
                user: {
                    userId: 123
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await BookController.returnBook(req, res);

            expect(BookService.returnBook).toHaveBeenCalledWith(1, 123);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Book returned successfully' });
        });

        it('should return an error if returning fails', async () => {
            BookService.returnBook.mockRejectedValue(new ServiceError('Book was not lent by this user'));

            const req = { params: { bookId: 1 }, user: { userId: 123 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await BookController.returnBook(req, res);

            expect(BookService.returnBook).toHaveBeenCalledWith(1, 123);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Book was not lent by this user' });
        });
    });
});
