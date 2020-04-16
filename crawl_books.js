const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
var Promise = require("bluebird");
const request = require("request");
const path = require("path");

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

  const imgUrl = $(
    ".booklist .booklist-book:first-child .product-image > img"
  ).attr("data-src");
  const title = $(".booklist .booklist-book:first-child h2 > a").text();
  const imgName = title.toLowerCase().split(" ").join("-") + ".jpg";
  request(imgUrl).pipe(fs.createWriteStream(imgName));
  // console.log("data: ", data);
}

// axios
//   .get(url)
//   .then(response => {
//     getData(response.data);
//     // console.log(response.data);
//   })
//   .catch(error => {
//     console.log("error:", error);
//   });

//getData(response.data);

function getImage(url) {
  axios
    .get(url)
    .then((response) => {
      getData(response.data);
      // console.log(response.data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}

jsonReader("./book_queries.json", (err, bookData) => {
  if (err) {
    console.log("error: ", err);
    return;
  }

  // try this with Bluebird

  const urls = [];
  bookData.forEach((book) => {
    // console.log(book.queryURL);
    urls.push(book.queryURL);
  });
  Promise.map(urls, getImage, { concurrency: 1 });
});
