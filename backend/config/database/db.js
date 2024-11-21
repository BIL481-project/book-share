const { Sequelize } = require('sequelize');
const initModels = require('../../models/init-models');

// Sequelize bağlantısını kuruyoruz
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_ENDPOINT, // AWS RDS veya yerel veritabanı
  dialect: 'mysql', // Kullanılan veritabanı türü
  logging: false,   // Konsola SQL sorguları yazdırmasını engellemek için
});

// Bağlantıyı test etme fonksiyonu
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Veritabanına başarıyla bağlanıldı!');
  } catch (error) {
    console.error('Veritabanına bağlanılamadı:', error);
    throw error;
  }
}

// Tabloları senkronize etme ve veritabanını başlatma fonksiyonu
async function initializeDatabase() {
  try {
    await testConnection(); // Bağlantıyı test et

    initModels(sequelize);

    await sequelize.sync(); // Tabloları senkronize et
    console.log('Tablolar başarıyla senkronize edildi!');

  } catch (error) {
    console.error('Veritabanı başlatma sırasında hata oluştu:', error);
    throw error;
  }
}

module.exports = { sequelize, initializeDatabase, testConnection };