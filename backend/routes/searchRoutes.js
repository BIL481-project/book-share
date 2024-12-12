const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const SearchController = require('../controllers/searchController');

router.get('/', SearchController.search);

module.exports = router;