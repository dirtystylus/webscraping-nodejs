const axios = require("axios");
const cheerio = require("cheerio");

const url = "http://books.toscrape.com/";

let getData = html => {
  data = [];
  const $ = cheerio.load(html);
  $("li.col-xs-6.col-sm-4.col-md-3.col-lg-3").each((i, elem) => {
    data.push({
      title: $(elem)
        .find("h3")
        .text(),
      link: $(elem)
        .find("a")
        .attr("href")
    });
  });
  console.log(data);
};

axios
  .get(url)
  .then(response => {
    getData(response.data);
    // console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });

//getData(response.data);
