const { Sequelize } = require('sequelize');

// Sequelize bağlantısını kuruyoruz
const sequelize = new Sequelize('library', 'root', 'alper', {
    host: '127.0.0.1', // AWS RDS veya yerel veritabanı
    dialect: 'mysql', // Kullanılan veritabanı türü (mysql, postgres, sqlite, vb.)
    logging: false,   // Konsola SQL sorguları yazdırmasını engellemek için
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Veritabanına başarıyla bağlanıldı!');
  } catch (error) {
    console.error('Veritabanına bağlanılamadı:', error);
  }
}

module.exports = { sequelize, testConnection };