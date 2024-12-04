const WebSocket = require('ws');

const activeConnections = new Map(); // userId -> ws connection

// Kullanıcı bağlantısını ekler
const addConnection = (userId, ws) => {
  activeConnections.set(userId, ws);
  console.log(`User ${userId} connected.`);
  sendMessageToUser(userId, 'bağlandın ve eklendin kankim');
  printActiveUserIds();
};

// Kullanıcı bağlantısını kaldırır
const removeConnection = (userId) => {
  activeConnections.delete(userId);
  console.log(`User ${userId} disconnected.`);
  printActiveUserIds();
};

// Kullanıcıya mesaj gönderir
const sendMessageToUser = (userId, message) => {
  const ws = activeConnections.get(userId);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
};

const sendNewNotification = (userId, notificationDetails) => {
    const message = {
      type: "new-notification",
      payload: notificationDetails,
    };
    sendMessageToUser(userId, message);
  };

const printActiveUserIds = () => {
  console.log('Active user IDs:');
  for (const userId of activeConnections.keys()) {
    console.log(userId);
  }
};
  

module.exports = {
  addConnection,
  removeConnection,
  sendMessageToUser,
  sendNewNotification,
};