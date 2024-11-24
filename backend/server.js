require('dotenv').config();
const app = require('./app');

const { initializeDatabase } = require('./config/database/db');
//const startNgrok = require('./utils/updateBackendUrl');
const startNgrok = require('./utils/updateNgrokUrls');
const startWebSocketServer = require('./websocketServer');

const PORT = process.env.HTTP_SERVER_PORT || 3000;

const startServer = async () => {
    await initializeDatabase();

    app.listen(PORT, async () => {
        console.log('Server is running on port ' + PORT);
        await startNgrok();
        startWebSocketServer();
    });
}

startServer();

