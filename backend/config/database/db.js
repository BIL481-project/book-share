const { Sequelize } = require('sequelize');

// Sequelize bağlantısını kuruyoruz
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_ENDPOINT, // AWS RDS veya yerel veritabanı
    dialect: 'mysql', // Kullanılan veritabanı türü (mysql, postgres, sqlite, vb.)
    logging: false,   // Konsola SQL sorguları yazdırmasını engellemek için
});

// Bağlantıyı test etme fonksiyonu
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Veritabanına başarıyla bağlanıldı!');
  } catch (error) {
    console.error('Veritabanına bağlanılamadı:', error);
  }
}

module.exports = { sequelize, testConnection };

