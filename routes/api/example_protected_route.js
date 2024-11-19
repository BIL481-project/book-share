const express = require('express');
const router = express.Router();
const User = require('../../backend/Models/User');

const authMiddleware = require('../../middlewares/authMiddleware');

router.get('/', authMiddleware);

module.exports = router;
