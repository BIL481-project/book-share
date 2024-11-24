require('dotenv').config({ path: '../.env'});
const app = require('./app');

const { testConnection: testDatabaseConnection } = require('./config/database/db')
const startNgrok = require('./utils/updateBackendUrl');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    startNgrok();
    testDatabaseConnection();
});
