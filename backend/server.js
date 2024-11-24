require('dotenv').config();
const app = require('./app');

const { initializeDatabase } = require('./config/database/db');
//const startNgrok = require('./utils/updateBackendUrl');
const startNgrok = require('./utils/updateNgrokUrls');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await initializeDatabase();

    app.listen(PORT, () => {
        console.log('Server is running on port ' + PORT);
        startNgrok();
    });
}

startServer();

