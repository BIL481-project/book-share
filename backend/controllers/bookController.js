const bookService = require('../services/bookService');

// Tüm kitaplarý döndüren endpoint
const fetchBooks = async (req, res) => { 
    const books = await bookService.getAllBooks();
    res.json(books);
};

const getBook = async (req, res) => {
    const bookId = req.params.id;
    const book = getBookById(bookId); //integer olduðu için ==
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};

const postBook = async (req, res) => {
    const book = req.body;
    bookService.createBook(book);
    res.status(201).json({ message: 'Book added successfuly' });
};

const deleteBook = async (req, res) => {
    const bookId = req.params.id;
    await bookService.deleteBookById(bookId);
    res.status(200);
};

module.exports = {
    fetchBooks,
    getBook,
    postBook,
    deleteBook,
};