const express = require("express");
const exphbs = require("express-handlebars");
const minifytext = require("./workers/minifiertext");
const beautifytext = require("./workers/beautifiertext");
const photoCopy = require("./workers/photoCopy");
const request = require("request");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "outline",
  })
);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

//  Usage: Function (url, outputPath)
// photoCopy("https://emagix.netlify.com", "./files/emagix.html")

app.get("/", function (req, res) {
  res.render("main");
});

app.get("/beautify", function (req, res) {
  res.render("beautify");
});

app.get("/minify", function (req, res) {
  res.render("minify");
});

app.post("/", (req, res) => {
  request(req.body.url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      res.render("main", {
        output: html,
      });
    }
  });
});

app.post("/minify", (req, res) => {
  if (req.body.url) {
    if (
      req.body.url.split(".").reverse()[0].toUpperCase() == "CSS" ||
      req.body.url.split(".").reverse()[0].toUpperCase() == "JSON" ||
      req.body.url.split(".").reverse()[0].toUpperCase() == "HTML"
    ) {
      request(req.body.url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const data = minifytext(
            req.body.url.split(".").reverse()[0].toUpperCase(),
            html
          );
          res.render("minify", {
            input: html,
            output: data,
          });
        }
      });
    } else if (req.body.url.split(".").reverse()[0].toUpperCase() == "JS") {
      request(req.body.url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const data = minifytext("Javascript", html);
          res.render("minify", {
            input: html,
            output: data,
          });
        }
      });
    } else {
      request(req.body.url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const data = minifytext("HTML", html);
          res.render("minify", {
            input: html,
            output: data,
          });
        }
      });
    }
  } else {
    const data = minifytext(req.body.lang, req.body.input);
    res.render("minify", {
      input: req.body.input,
      output: data,
    });
  }
});

app.post("/beautify", (req, res) => {
  if (req.body.url) {
    if (
      req.body.url.split(".").reverse()[0].toUpperCase() == "CSS" ||
      req.body.url.split(".").reverse()[0].toUpperCase() == "JSON" ||
      req.body.url.split(".").reverse()[0].toUpperCase() == "HTML"
    ) {
      request(req.body.url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const data = beautifytext(
            req.body.url.split(".").reverse()[0].toUpperCase(),
            html
          );
          res.render("beautify", {
            input: html,
            output: data,
          });
        }
      });
    } else if (req.body.url.split(".").reverse()[0].toUpperCase() == "JS") {
      request(req.body.url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const data = beautifytext("Javascript", html);
          res.render("beautify", {
            input: html,
            output: data,
          });
        }
      });
    } else {
      request(req.body.url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const data = beautifytext("HTML", html);
          res.render("beautify", {
            input: html,
            output: data,
          });
        }
      });
    }
  } else {
    const data = beautifytext(req.body.lang, req.body.input);
    res.render("beautify", {
      input: req.body.input,
      output: data,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
