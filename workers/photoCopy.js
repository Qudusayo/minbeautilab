const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const photoCopy = (url, output) => {
request(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    fs.writeFile(output, html, function (err) {
      if (err) throw err;
      console.log("Copied");
    });
  }
});
}

module.exports = photoCopy