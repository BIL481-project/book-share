const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', AuthController.signup);

router.post('/login', AuthController.login);

router.get('/me', AuthController.getMe);

module.exports = router;