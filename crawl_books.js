const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "http://books.toscrape.com/";

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

function getData(html) {
  data = [];
  const $ = cheerio.load(html);
  data.push({
    img: $(".booklist .booklist-book:first-child .product-image > img").attr(
      "data-src"
    )
  });
  console.log("data: ", data);
}

axios
  .get(url)
  .then(response => {
    getData(response.data);
    // console.log(response.data);
  })
  .catch(error => {
    console.log("error:", error);
  });

//getData(response.data);

jsonReader("./book_queries.json", (err, bookData) => {
  if (err) {
    console.log("error: ", err);
    return;
  }
  // const books = bookData.books;
  bookData.forEach(book => {
    // console.log(book.queryURL);
    axios
      .get(book.queryURL)
      .then(response => {
        getData(response.data);
        // console.log(response.data);
      })
      .catch(error => {
        console.log("error: ", error);
      });
  });
});
