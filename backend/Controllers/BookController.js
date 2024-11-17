const express = require('express');
const router = express.Router();

const bookService = require('../Services/BookService');

// Tüm kitaplarý döndüren endpoint
router.get('/', async (req, res) => {
    const books = await bookService.getAllBooks();
    res.json(books);
});

// Belirli bir ID'ye göre kitap döndüren endpoint
router.get('/:id', async (req, res) => {
    const books = await bookService.getAllBooks();
    const bookId = req.params.id;
    const book = books.find((b) => b.id == bookId); //integer olduðu için ==
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

module.exports = router;

