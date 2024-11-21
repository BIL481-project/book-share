require('dotenv').config();
const app = require('./app');

const { initializeDatabase } = require('./config/database/db');
const startNgrok = require('./utils/updateBackendUrl');

const PORT = process.env.PORT;

const startServer = async () => {
    await initializeDatabase();

    app.listen(PORT, () => {
        console.log('Server is running on port ' + PORT);
        startNgrok();
    });
}

startServer();

