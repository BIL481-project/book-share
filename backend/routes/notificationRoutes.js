const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const NotificationController = require('../controllers/notificationController');

router.get('/get', authenticateToken, NotificationController.getUserNotifications);

module.exports = router;