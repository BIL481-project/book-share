const express = require('express');
const BookController = require('../controllers/bookController');
const router = express.Router();

router.get('/', BookController.fetchBooks);
router.get('/:id', BookController.getBook);
router.post('/', BookController.postBook);

module.exports = router;