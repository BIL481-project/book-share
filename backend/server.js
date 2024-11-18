require('dotenv').config();
const app = require('./app');

const { testConnection: testDatabaseConnection } = require('./config/database/db')
const startNgrok = require('./utils/updateBackendUrl');

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    startNgrok();
    testDatabaseConnection();
});
