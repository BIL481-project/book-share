require('dotenv').config();
const http = require('http');
const app = require('./app');

const { initializeDatabase } = require('./config/database/db');
const startNgrok = require('./utils/updateBackendUrl');
const startWebSocketServer = require('./websocket/websocketServer');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await initializeDatabase();

    const server = http.createServer(app);

    server.listen(PORT, async () => {
        console.log('Server is running on port ' + PORT);
        await startNgrok();
        startWebSocketServer(server);
    });
}

startServer();

