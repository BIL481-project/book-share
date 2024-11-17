const express = require('express');
const router = express.Router();

const bookService = require('../Services/BookService');

// T�m kitaplar� d�nd�ren endpoint
router.get('/', async (req, res) => {
    const books = await bookService.getAllBooks();
    res.json(books);
});

// Belirli bir ID'ye g�re kitap d�nd�ren endpoint
router.get('/:id', async (req, res) => {
    const books = await bookService.getAllBooks();
    const bookId = req.params.id;
    const book = books.find((b) => b.id == bookId); //integer oldu�u i�in ==
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

router.post('/', async (req, res) => {
    const book = req.body;
    bookService.addBook(book);
    res.status(201).json({ message: 'Book added successfuly' });
});

module.exports = router;
