const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const BookController = require('../controllers/bookController');

router.post('/lend/:bookId', authenticateToken, BookController.lendBook);
router.post('/return/:bookId', authenticateToken, BookController.returnBook);
router.get('/', BookController.fetchBooks);
router.get('/:id', BookController.getBook);
router.post('/', authenticateToken, BookController.postBook);


module.exports = router;