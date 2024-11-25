const WebSocket = require('ws');

// WebSocket Sunucusunu başlat
const startWebSocketServer = (server) => {
  const wss = new WebSocket.Server({ server });

  console.log('WebSocket sunucusu çalışıyor.');

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