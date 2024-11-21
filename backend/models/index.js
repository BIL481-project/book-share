// Modelleri import ederken kolaylık sağlaması için tüm modelleri export eden dosya

const { sequelize } = require('../config/database/db'); // Sequelize bağlantısı
const initModels = require('./init-models'); // initModels fonksiyonu

// initModels'i çağır ve modelleri al
const models = initModels(sequelize);

module.exports = models;