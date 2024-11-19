const { sequelize, testConnection } = require('../../database/config/db');

const User = require('./User');
const Book = require('./Book');

testConnection();

sequelize.sync({
    force: true
});