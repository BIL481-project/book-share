import { BACKEND_URL } from '@env';
import { Alert } from 'react-native';
import { getSessionUserId } from '../utils/getSessionUserId';

let websocket = null;
let isConnected = false;
let pingInterval = null;

const connectWebSocket = async () => {
    if (isConnected) {
      console.log('WebSocket is already connected.');
      return;
    }

    const userId = await getSessionUserId();
    if (!userId) {
        console.log('No valid token found. WebSocket connection will NOT be started.');
        return;
    }

    websocket = new WebSocket(BACKEND_URL);

    websocket.onopen = () => {
        console.log('WebSocket connection established.');
        isConnected = true;

        pingInterval = setInterval(() => {
            if (websocket && websocket.readyState === WebSocket.OPEN) {
              websocket.send(JSON.stringify({ type: 'ping' }));
              console.log('Ping message sent to keep the connection alive.');
            }
          }, 15000); // Her 15 saniyede bir "ping" gönder

        sendIdentifyMessage(userId);
    };

    websocket.onmessage = handleWebSocketMessage;

    websocket.onerror = (error) => {
        console.error('WebSocket error:', error.message);
    };

    websocket.onclose = () => {
        console.log('WebSocket connection closed.');
        isConnected = false;

        if (pingInterval) {
            clearInterval(pingInterval);
            pingInterval = null;
        }
    };

};
  
const closeWebSocket = async () => {
    if (!websocket || !isConnected) return;

    websocket.close();
    websocket = null;
    isConnected = false;
    console.log('WebSocket connection manually closed.');
};

const sendIdentifyMessage = (userId) => {
    if (websocket && isConnected) {
        const identifyMessage = JSON.stringify({
            type: 'identify',
            userId,
        });
        console.log(`Sending identify message: ${identifyMessage}`);
        websocket.send(identifyMessage);
    } else {
        console.warn('WebSocket not connected or already closed.');
    }
};


/*const sendLogoutMessage = (userId) => {
    if (websocket && isConnected) {
        const breakUpMessage = JSON.stringify({
            type: 'remove_connection',
            userId,
        });
        websocket.send(breakUpMessage);
        console.log(`Logout message sent for user ID: ${userId}`);
    }
};*/

const handleWebSocketMessage = (event) => {
    try {
        const message = JSON.parse(event.data);
        switch (message.type) {
            case 'new-notification':
                console.log('New notification received:', message.payload);
                Alert.alert('Notification', message.payload.message);
                break;
            default:
                console.log('Unhandled message type:', message);
        }
    } catch (error) {
        console.error('Error parsing WebSocket message:', error);
    }
};

export default { connectWebSocket, closeWebSocket, sendIdentifyMessage };