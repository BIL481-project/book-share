const express = require('express');
const AuthController = require('../layers/controllers/AuthController');
const router = express.Router();

router.post('/signup', AuthController.signup);

router.post('/login', AuthController.login);

module.exports = router;