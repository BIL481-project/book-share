const WebSocket = require('ws');
const websocketManager = require('./websocketManager');

const handleMessage = (message, ws) => {
  try {
    const data = JSON.parse(message); // Gelen mesajı parse et

    switch (data.type) {
      case 'identify':
        // Kullanıcıyı identify et
        if (data.userId) {
          websocketManager.addConnection(data.userId, ws);
          console.log(`User ${data.userId} identified and added to active connections.`);
        } else {
          console.warn('Identify message received without userId.');
        }
        break;

      case 'remove_connection':
        if(data.userId)  {
          websocketManager.removeConnection(data.userId);
        }
        break;

      case 'test_message':
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data.message));
        }
        break;

      default:
        console.warn(`Unknown message type: ${data.type}`);
    }
  } catch (error) {
    console.error('Error processing message:', error.message);
  }
};

module.exports = { handleMessage };