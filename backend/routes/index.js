const express = require('express');
const router = express.Router();

const books = require('../../dummy_data/books.json')

const authRoutes = require('./auth');
const testRoutes = require('./test/example_protected_route')

const profileRouter = require('./profileRouter')

// Alt route'ları bağlama
router.use('/auth', authRoutes);  // /auth/login, /auth/signup
router.use('/test', testRoutes);

router.use('/api/profiles', profileRouter);

router.get('/api/start', (req, res) => {
    res.json({ message: "Kitaplar ekranına yönlendiriliyorsunuz" });
});

router.get('/api/books', (req, res) => {
    res.json(books);
});

// Belirli bir ID'ye göre kitap döndüren endpoint
router.get('/api/books/:id', (req, res) => {
    const bookId = req.params.id;
    const book = books.find((b) => b.id === bookId);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
});


module.exports = router;
