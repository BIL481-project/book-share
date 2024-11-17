require('dotenv').config();

const { sequelize } = require('../backend/db');

async function runRawQueries() {
  try {
    const result = await sequelize.query('SELECT * FROM test_table');
    console.log(result);
  } catch (error) {
    console.error('Sorgu sırasında hata oluştu:', error);
  }
};

runRawQueries();