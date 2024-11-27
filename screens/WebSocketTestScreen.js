import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { BACKEND_URL } from '@env'; // WebSocket URL'sini .env dosyasından al

const WebSocketTestScreen = () => {
  const [message, setMessage] = useState(''); // Gönderilecek mesaj
  const [receivedMessage, setReceivedMessage] = useState(''); // Sunucudan gelen mesaj
  const [ws, setWs] = useState(null); // WebSocket bağlantısını saklar

  // WebSocket bağlantısını kur
  useEffect(() => {
    const websocket = new WebSocket(BACKEND_URL);

    // Bağlantı kurulduğunda
    websocket.onopen = () => {
      console.log('WebSocket bağlantısı kuruldu.');
    };

    // Sunucudan mesaj alındığında
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data); // JSON formatında gelen mesaj
      console.log('Sunucudan gelen mesaj:', data.message);
      setReceivedMessage(data.message);
    };

    // Hata oluştuğunda
    websocket.onerror = (error) => {
      console.error('WebSocket bağlantı hatası:', error.message);
    };

    // Bağlantı kapandığında
    websocket.onclose = () => {
      console.log('WebSocket bağlantısı kapandı.');
    };

    // WebSocket'i state'e kaydet
    setWs(websocket);

    // Cleanup (component unmount olduğunda bağlantıyı kapat)
    return () => {
      websocket.close();
    };
  }, []);

  // Mesajı sunucuya gönder
  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const messageData = { message }; // Gönderilecek mesaj JSON formatında
      ws.send(JSON.stringify({ type: 'test_message', message: messageData }));
      console.log('Mesaj gönderildi:', message);
      setMessage(''); // Mesaj kutusunu temizle
    } else {
      console.error('WebSocket bağlantısı açık değil.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WebSocket Test Ekranı</Text>
      <TextInput
        style={styles.input}
        placeholder="Gönderilecek mesajı yazın"
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <Button title="Mesaj Gönder" onPress={sendMessage} />
      <Text style={styles.label}>Sunucudan Gelen Mesaj:</Text>
      <Text style={styles.receivedMessage}>{receivedMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  receivedMessage: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
  },
});

export default WebSocketTestScreen;