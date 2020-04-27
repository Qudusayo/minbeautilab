const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");

request(
  "https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Nigeria",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const table = $(".wikitable");

      var units = table.text();
      units = units.split("\n");
      console.log(units);
      fs.writeFile('./output.js', units, function (err) {
        if (err) throw err;
        console.log("Copied");
      });
    }
  }
);
