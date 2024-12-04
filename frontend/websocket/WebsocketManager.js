import { BACKEND_URL } from '@env';
import { Alert } from 'react-native';
import { getSessionUserId } from '../utils/getSessionUserId';
//import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

let websocket = null;
let isConnected = false;

const connectWebSocket = async (userId = null) => {
    if (isConnected) {
      console.log('WebSocket is already connected.');
      return;
    }

    try {
        const userId = await getSessionUserId();

        websocket = new WebSocket(BACKEND_URL);

        websocket.onopen = async () => {
            console.log('WebSocket connection established.');
            isConnected = true;
            
            sendIdentifyMessage(userId);
        };
    
        websocket.onmessage = (event) => {
            // MESAJI HANDLE ET
        };
        
        websocket.onerror = (error) => {
            console.error('WebSocket error:', error.message);
        };
        
        websocket.onclose = () => {
            console.log('WebSocket connection closed.');
            isConnected = false;
        };

        sendIdentifyMessage(userId);
    } catch (error) {
        throw error;
    }
};
  


const closeWebSocket = async () => {
    if(websocket) {
        try {
            const userId = await getSessionUserId();
            console.log('closeWebSocket içi userID: ' + userId);
            if(userId) {
                sendLogoutMessage(userId);
            }
        } catch (error) {
            console.log('You were not logged in, logoutMessage will not be sent.');
        } finally {
            websocket.close();
            websocket = null;
            isConnected = false; 
        }
    }
};

const sendIdentifyMessage = (userId) => {
    if(websocket) {
        if (userId) {
            console.log(userId);

            const identifyMessage = JSON.stringify({
                type: 'identify',
                userId,
            });

            websocket.send(identifyMessage);
            console.log(`Identify message sent for user ID: ${userId}`);
        }
    }    
};

const sendLogoutMessage = (userId) => {
    if(websocket) {
        if (userId) {
            console.log(userId);

            const breakUpMessage = JSON.stringify({
                type: 'remove_connection', userId: userId 
            });        

            websocket.send(breakUpMessage);  
            console.log(`Leaving message sent for user ID: ${userId}`);
        }
    }    
};


export default { connectWebSocket, closeWebSocket, sendIdentifyMessage, sendLogoutMessage };