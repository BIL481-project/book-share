const eventBus = require('../utils/eventBus');
const { sendNewNotification } = require('./websocketManager');

// Yeni bir bildirim gönderme olayını yakalar
eventBus.on('new-notification', ({ userId, notificationDetails }) => {
  sendNewNotification(userId, notificationDetails);
});

module.exports = {}; // Bu dosya olayları dinlemek için yalnızca import edilir