const express = require("express");
const exphbs = require("express-handlebars");
const minifytext = require("./workers/minifiertext");
const beautifytext = require("./workers/beautifiertext");
const photoCopy = require("./workers/photoCopy");

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

app.post("/minify", (req, res) => {
  const data = minifytext(req.body.lang, req.body.input);
  res.render("minify", {
    input: req.body.input,
    output: data,
  });
});

app.post("/beautify", (req, res) => {
  const data = beautifytext(req.body.lang, req.body.input);
  res.render("beautify", {
    input: req.body.input,
    output: data,
  });
});

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
