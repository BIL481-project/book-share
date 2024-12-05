const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock(); // Mock veritabanı bağlantısı

// Book Model
const BookMock = dbMock.define('books', {
  id: 1,
  name: 'Test Book',
  isAvailable: true,
  borrowerId: null,
  ownerId: 1,
});

// User Model
const UserMock = dbMock.define('users', {
  id: 1,
  name: 'Test User',
});

module.exports = { BookMock, UserMock };
