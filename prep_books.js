const fs = require("fs");

fs.readFile("./books.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed", err);
    return;
  }
  try {
    const bookData = JSON.parse(jsonString);
    console.log("books: ", bookData.books[0].title);
  } catch (error) {
    console.log("Error parsing JSON string", err);
  }
  console.log("File data:", jsonString);
});
