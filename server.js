require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { testConnection: testDatabaseConnection } = require('./database/db')
const startNgrok = require('./updateBackendUrl');
const books = require('./data/books.json'); // Eğer 'data' klasörü altındaysa

const app = express();
const PORT = 3000;

app.use(cors());
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
    res.send('Hello from' + PORT + 'port!');
});

app.get('/api/start', (req, res) => {
    res.json({ message: "Kitaplar ekranına yönlendiriliyorsunuz" });
});

// Tüm kitapları döndüren endpoint
app.get('/api/books', (req, res) => {
    res.json(books);
  });

// Belirli bir ID'ye göre kitap döndüren endpoint
app.get('/api/books/:id', (req, res) => {
    const bookId = req.params.id;
    const book = books.find((b) => b.id === bookId);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  });

// Sunucuyu başlatma ve Ngrok bağlantısını başlatma
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    startNgrok();
    testDatabaseConnection();
});
