const express = require('express');
const ProfileController = require('../controllers/profileController');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/:userName', ProfileController.getUserProfile);
router.get('/', authenticateToken, ProfileController.getUserProfileByToken);

module.exports = router;