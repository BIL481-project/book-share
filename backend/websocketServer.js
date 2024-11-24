const WebSocket = require('ws');

const PORT = process.env.WEBSOCKET_SERVER_PORT || 8000; // WebSocket sunucusunun çalışacağı port

// WebSocket Sunucusunu başlat
const startWebSocketServer = () => {
  const wss = new WebSocket.Server({ port: PORT });

  console.log(`WebSocket sunucusu ${PORT} portunda çalışıyor.`);

  // Yeni istemci bağlantılarını dinle
  wss.on('connection', (ws) => {
    console.log('Yeni bir istemci bağlandı.');

    // İstemciye bağlantı mesajı gönder
    ws.send(JSON.stringify({ message: 'WebSocket bağlantısı kuruldu!' }));

    // İstemciden gelen mesajları dinle
    ws.on('message', (message) => {
      console.log('İstemciden gelen mesaj:', message);

      // İstemciye geri yanıt gönder
      ws.send(JSON.stringify({ message: `Mesajınız alındı: ${message}` }));
    });

    // İstemci bağlantısı kapandığında
    ws.on('close', () => {
      console.log('Bir istemci bağlantıyı kapattı.');
    });
  });
};

module.exports = startWebSocketServer;