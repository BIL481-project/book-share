const express = require('express');
const router = express.Router();
const { User } = require('../../models/index');
const eventBus = require('../../utils/eventBus');

const authMiddleware = require('../../middlewares/authMiddleware');

router.get('/protected', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Profil bilgileri alınamadı', details: error });
  }
});

router.post('/send-notification', (req, res) => {
  const { userId, notificationDetails } = req.body;

  if (!userId || !notificationDetails) {
      return res.status(400).json({ error: 'userId and notificationDetails are required' });
  }

  // Emit the event
  eventBus.emit('new-notification', { userId, notificationDetails });
  console.log(`New notification event emitted for userId: ${userId}`);

  return res.status(200).json({ success: true, message: 'Notification event emitted' });
});

module.exports = router;
