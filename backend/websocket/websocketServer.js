const WebSocket = require('ws');
const { addConnection, removeConnection } = require('./websocketManager');
const { handleMessage } = require('./websocketMessageHandler');
require('./websocketEventHandler');

const startWebSocketServer = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    const userId = new URL(req.url, `http://${req.headers.host}`).searchParams.get('userId');
    if (userId) {
      addConnection(userId, ws);
    }

    ws.on('close', () => {
      if (userId) {
        removeConnection(userId);
      }
    });

    ws.on('message', (message) => {
      handleMessage(message, ws);
    });
  });

  console.log('WebSocket server is running.');
};

module.exports = startWebSocketServer;