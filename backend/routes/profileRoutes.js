const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const ProfileController = require('../controllers/profileController');

router.get('/my', authenticateToken, ProfileController.getUserProfileByToken);
router.get('/:userName', ProfileController.getUserProfile);

module.exports = router;