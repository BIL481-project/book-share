const Book = require('../Models/Book');

//INSERT FUNCTIONS
async function insertBook(name, location, description, image) {
  try {
    const newBook = await Book.create({
      name: name,
      description: description,
      location: location,
      image: image,
    });
    console.log('insertBook success.');
  } catch (error) {
    console.error('insertBook error:', error);
  }
}

//GET FUNCTIONS
async function findAllBooks() {
  try {
	const books = await Book.findAll();
    console.log('findAllBooks success.');
    return books.map((book) => book.toJSON());

  } catch (error) {
    console.error('findAllBooks error:', error);
  }
}

async function findBookById(bookId) {
  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
        throw new Error("book does not exist.")
    }
    console.log('findBookById succcess.');
    return book.toJSON();

  } catch (error) {
    console.error('findBookById error:', error);
  }
}

async function findBookByOwnerId(ownerId) {
    /* FILL */
}

async function findBookByCommunityId(communityId) {
    /* FILL */
}

module.exports = { findAllBooks, findBookById, insertBook }

/* TEST CODE */
/*
findAllBooks().then(
  function(result) { console.log(result) },
  function(error) { console.log("findAllBooks testingte hata oldu") }
);

findBookById(1).then(
    function(result) { console.log(result) },
    function(error) { console.log("findBookById'de testingte hata oldu") }
)
*/

//findBookByOwnerId()
//findBookByCommunityId()