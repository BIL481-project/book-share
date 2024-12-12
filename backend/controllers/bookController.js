const BookService = require('../services/bookService');
const RepositoryError = require('../errors/RepositoryError');
const ServiceError = require('../errors/ServiceError');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

// T�m kitaplar� d�nd�ren endpoint
const fetchBooks = async (req, res) => { 
    const books = await BookService.getAllBooks();
    res.json(books);
};

const getBook = async (req, res) => {
    const bookId = req.params.id;
    const book = await BookService.getBook({
        where: {
            id: bookId
        }
    });
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};

const postBook = [
    uploadMiddleware, // Güncellenmiş middleware'i kullan
    async (req, res) => {
        try {
            // Eğer resim yüklenmemişse null belirle
            const imageUrl = req.file ? req.file.location : null;

            // `req.body` içindeki form verileri
            const { name, description, genre, location } = req.body;

            // `req.user` içindeki userId bilgisi (JWT'den çıkarılmıştır)
            const ownerId = req.user.userId;

            // Kitap bilgileri
            const book = {
                name,
                description,
                genre,
                location,
                ownerId, // Token'den alınan userId
                isAvailable: 1,
                borrowerId: null,
                image: imageUrl, // Varsayılan resim ya da yüklenen resim
            };

            // Kitap servisi aracılığıyla veri tabanına ekle
            const createdBook = await BookService.createBook(book);

            res.status(201).json({ message: 'Book added successfully!', id: createdBook.id });
        } catch (error) {
            console.error('Error adding book:', error.message);
            res.status(500).json({ error: 'Failed to add book.' });
        }
    },
];

const deleteBook = async (req, res) => {
    const bookId = req.params.id;
    await BookService.deleteBookById(bookId);
    res.status(200);
};

const lendBook = async (req, res) => {
    const { bookId } = req.params; 
    const borrowerId = req.user.userId;

    try {
        const result = await BookService.lendBook(bookId, borrowerId);
        if (result.success) {
            return res.status(200).json({ message: result.message });
        } else {
            return res.status(400).json({ message: result.message });
        }
    } catch (error) {
        if (error instanceof RepositoryError) {
            console.error('Repository katmanı hatası: ' + error.message);
            return res.status(500).json({ error: error.message });
        }
        if (error instanceof ServiceError) {
            console.error('Service katmanı hatası: ', error.message);
            return res.status(400).json({ error: error.message });
        }

        console.error('Error in lendBook controller:', error.message);
        return res.status(500).json({ message: `Error lending book: ${error.message}` });
    }
};

const returnBook = async (req, res) => {
    const { bookId } = req.params; // URL parametresinden bookId al
    const userId = req.user.userId; // Middleware'den gelen authenticated userId

    try {
        const result = await BookService.returnBook(bookId, userId);
        if (result.success) {
            return res.status(200).json({ message: result.message });
        } else {
            return res.status(400).json({ message: result.message });
        }
    } catch (error) {
        if (error instanceof RepositoryError) {
            console.error('Repository katmanı hatası: ' + error.message);
            return res.status(500).json({ error: error.message });
        }
        if (error instanceof ServiceError) {
            console.error('Service katmanı hatası: ', error.message);
            return res.status(400).json({ error: error.message });
        }

        console.error('Error in returnBook controller:', error.message);
        return res.status(500).json({ message: `Error returning book: ${error.message}` });
    }
};


module.exports = {
    fetchBooks,
    getBook,
    postBook,
    deleteBook,
    lendBook,
    returnBook,
};