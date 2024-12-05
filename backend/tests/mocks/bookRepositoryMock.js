const { BookMock } = require('./sequelizeMock');

// Mock findBook
const findBook = jest.fn((filters) => {
  if (filters.where.id === 1) {
    return Promise.resolve(BookMock.build());
  }
  return Promise.resolve(null); // Kitap bulunamadı
});

// Mock updateBook
const updateBook = jest.fn(() => Promise.resolve(1)); // Başarıyla güncellendi

module.exports = { findBook, updateBook };