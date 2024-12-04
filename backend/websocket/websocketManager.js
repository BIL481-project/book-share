const WebSocket = require('ws');

const activeConnections = new Map(); // userId -> ws connection

// Kullanıcı bağlantısını ekler
const addConnection = (userId, ws) => {
  if (!userId || !ws) {
    console.warn('addConnection: Invalid userId or WebSocket object.', { userId, ws });
    return;
  }

  activeConnections.set(userId, ws);
  console.log(`User ${userId} connected.`);
  sendMessageToUser(userId, 'Aktif bağlantılar arasına eklendin.');
  printActiveUserIds();

  // Bağlantı kapandığında, kullanıcıyı Map'ten temizle
  ws.on('close', () => {
    removeConnection(userId);
    console.log("User id'si " + userId + " olan client'ın websocket bağlantısı sonlandı ve map'ten çıkarıldı.");
    printActiveUserIds();
  });
};


// Kullanıcı bağlantısını kaldırır
const removeConnection = (userId) => {
  activeConnections.delete(userId);
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