const beautify_css = require("js-beautify").css;
const beautify_html = require("js-beautify").html;
const beautify = require("js-beautify").js;

function beautifytext (type, input, output){
    if(type == 'HTML'){
        data = beautify_html(input, {
            indent_size: 4,
            "--indent-inner-html": true,
          });
          return data
    }
    if(type == 'CSS'){
        data = beautify_css(input, { indent_size: 4 });
        return data;
    }
    if(type == 'Javascript' || type == 'JSON'){
        data = beautify(input, { indent_size: 4, space_in_empty_paren: true });
        return data
    }
}

module.exports = beautifytext;
