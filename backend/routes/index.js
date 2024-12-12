const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const testRoutes = require('./test/example_protected_route');

const profileRoutes = require('./profileRoutes');
const bookRoutes = require('./bookRoutes');
const searchRoutes = require('./searchRoutes');
const notificationRoutes = require('./notificationRoutes');

// Alt route'ları bağlama
router.use('/notifications', notificationRoutes);
router.use('/auth', authRoutes);  // /auth/login, /auth/signup
router.use('/test', testRoutes);

router.use('/profiles', profileRoutes);

router.use('/books', bookRoutes);

router.use('/search', searchRoutes);

router.get('/start', (req, res) => {
    res.json({ message: "Kitaplar ekranına yönlendiriliyorsunuz" });
});

module.exports = router;