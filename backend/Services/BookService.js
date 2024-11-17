const bookRepository = require('./BookRepository');

async function getAllBooks() {
  try {
    const books = await bookRepository.findAllBooks();
    console.log('getAllBooks success.');
    return books;

  } catch (error) {
    console.error('getAllBooks error: ', error);
  }
}

async function getBookById(bookId) {
  try {
    const book = await bookRepository.findBookById(bookId);
    if (!book) {
        throw new Error("book not found");
    }
    console.log('getBookById success.');
    return book;

  } catch (error) {
    console.error('getBookById error: ', error);
  }
}

async function getBookByOwnerId(ownerId) {
  /* FILL */
}

async function getBookByCommunityId(communityId) {
  /* FILL */
}

//async function addBook(bookData) {
  // �� kurallar�n� uygulay�n (�rne�in, ayn� isimde kitap var m� kontrol�)
  //return await bookRepository.addBook(bookData);
//}

module.exports = { getAllBooks, getBookById };

/* TEST CODE */

/*
getAllBooks().then(
  function(result) { console.log(result) },
  function(error) { console.log(error) }
);

getBookById(1).then( //valid id giri� testi
    function(result) { console.log(result) },
    function(error) { console.log(error) }
);

getBookById(5).then( //invalid id giri� testi
    function(result) { console.log(result) },
    function(error) { console.log(error) }
);
*/


