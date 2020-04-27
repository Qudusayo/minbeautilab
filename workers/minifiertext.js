const csso = require("csso");
const minify = require("html-minifier").minify;
const UglifyJS = require("uglify-es");
const jsonminify = require("jsonminify");

function minifiertext(type, input) {
  if (type == "HTML") {
    data = minify(input, {
      // removeAttributeQuotes: true,
      removeComments: true,
      collapseWhitespace: true,
      caseSensitive: true,
    });
    console.log("Minified");
    return data;
  }
  if (type == "CSS") {
    data = csso.minify(input).css;
    console.log("Minified");
    return data;
  }
  if (type == "Javascript") {
    var options = {
      mangle: {
        toplevel: true,
      },
      nameCache: {},
    };

    data = UglifyJS.minify(
      {
        data: input,
      },
      options
    );
    console.log("Minified");
    return data.code;
  }
  if (type == "JSON") {
    data = jsonminify(input);
    console.log("Minified");
    return data;
  }
}

module.exports = minifiertext;
