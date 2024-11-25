const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const BookController = require('../controllers/bookController');

router.get('/', BookController.fetchBooks);
router.get('/:id', BookController.getBook);
router.post('/', authenticateToken, BookController.postBook);

module.exports = router;