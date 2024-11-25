import { BACKEND_URL } from '@env';
import authApi from './axios_instances/authApi'; // Mevcut interceptor ile oluşturulmuş axios instance
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';


let websocket = null;
let isConnected = false;

const initialize = async () => {
  try {
    let userId = null;

    // auth/me endpoint'ine istek gönderiyoruz
    const response = await authApi.get('/auth/me').catch((error) => {
        // Axios'un fırlattığı hatayı burada yakalıyoruz
        console.error('API Hatası:', error.response?.data || error.message);
        return error.response; // Hata yanıtını döndür
      });
    
      // Hata yoksa response verisini işliyoruz
      if (response) {
        const data = response.data;
    
        // Eğer error yoksa kullanıcıyı doğrulamışız demektir
        if (response.status != 500) {
          userId = data.user.userId; // userId bilgisi burada bulunur
          console.log(`User identified with ID: ${userId}`);
        } else {
          console.log('User not authenticated. Proceeding without identification.');
        }
      } else {
        console.log('Backend hatası veya token geçersiz.');
      }

    // WebSocket bağlantısını başlatıyoruz
    connectWebSocket(userId);
  } catch (error) {
    console.error('Error initializing WebSocket:', error.message);
  }
};

const connectWebSocket = (userId = null) => {
  if (isConnected) {
    console.log('WebSocket is already connected.');
    return;
  }

  websocket = new WebSocket(BACKEND_URL);

  websocket.onopen = () => {
    console.log('WebSocket connection established.');
    isConnected = true;

    // Eğer userId varsa sunucuya identify mesajı gönder
    if (userId) {
      const identifyMessage = JSON.stringify({
        type: 'identify',
        userId,
      });
      websocket.send(identifyMessage);
      console.log(`Identify message sent for user ID: ${userId}`);
    }
  };

  websocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Message received from WebSocket:', data);
    // Gelen mesajlara göre gerekli işlemler
    handleIncomingMessage(data);
  };

  websocket.onerror = (error) => {
    console.error('WebSocket error:', error.message);
  };

  websocket.onclose = () => {
    console.log('WebSocket connection closed.');
    isConnected = false;
  };
};

const handleIncomingMessage = (message) => {
  console.log('Incoming WebSocket message:', message);
};

const close = async () => {
    if (websocket) {

        let userId = null;

        // auth/me endpoint'ine istek gönderiyoruz
        const response = await authApi.get('/auth/me').catch((error) => {
            // Axios'un fırlattığı hatayı burada yakalıyoruz
            console.error('API Hatası:', error.response?.data || error.message);
            return error.response; // Hata yanıtını döndür
          });
        
          // Hata yoksa response verisini işliyoruz
          if (response) {
            const data = response.data;
        
            // Eğer error yoksa kullanıcıyı doğrulamışız demektir
            if (response.status != 500) {
              userId = data.user.userId; // userId bilgisi burada bulunur
              
            } else {
             
            }
          } else {
            
          }


      console.log('user id: ' + userId);

      const logoutMessage = JSON.stringify({ type: 'remove_connection', userId: userId });
      websocket.send(logoutMessage);   

      websocket.close(); // Bağlantıyı kapatıyoruz
      websocket = null;
      isConnected = false;
      console.log('WebSocket connection closed and cleaned up.');
    }
  };

const getWebSocket = () => websocket;

export default { initialize, getWebSocket, close };
