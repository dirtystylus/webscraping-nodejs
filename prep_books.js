const fs = require("fs");

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}

jsonReader("./books.json", (err, bookData) => {
  if (err) {
    console.log(err);
    return;
  }
  // const books = bookData.books;
  const queryBaseUrl = "https://bookshop.org/books?keywords=";
  const queryBooks = [];
  bookData.forEach(book => {
    const queryTitle = book.title.split(" ").join("+");
    const bookQuery = {
      queryURL: queryBaseUrl + encodeURIComponent(queryTitle)
    };
    queryBooks.push(bookQuery);
  });
  console.log("queryBooks: ", queryBooks);
  const jsonString = JSON.stringify(queryBooks);
  fs.writeFile("./book_queries.json", jsonString, err => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
});
