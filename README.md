There’s a few files here, and a lot of hard-coded stuff, so YMMV.

* **prep\_books.js**: I used this to set up a list of URLs pointing to the site I wanted to scrape
* **book\_queries.json**: The results of **prep\_books.js** get written to this file
* **crawl\_books.json**: This walks through the list of URLs, grabs the data, parses it, then makes a second request for the book image and saves that to disk