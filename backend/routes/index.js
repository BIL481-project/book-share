const express = require('express');
const router = express.Router();

const books = require('../../dummy_data/books.json');

const authRoutes = require('./auth');
const testRoutes = require('./test/example_protected_route');

const profileRouter = require('./profileRouter');
const bookRouter = require('./bookRouter');
const searchRouter = require('./searchRouter');

// Alt route'ları bağlama
router.use('/auth', authRoutes);  // /auth/login, /auth/signup
router.use('/test', testRoutes);

router.use('/profiles', profileRouter);

router.use('/books', bookRouter);

router.use('/search', searchRouter);

router.get('/api/start', (req, res) => {
    res.json({ message: "Kitaplar ekranına yönlendiriliyorsunuz" });
});

module.exports = router;