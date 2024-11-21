const express = require('express');
const ProfileController = require('../controllers/profileController');
const router = express.Router();

router.get('/:userName', ProfileController.getUserProfile);

module.exports = router;