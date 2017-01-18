'use strict';
/**
 * This file only use to run presentation locally.
 */
const http = require("http");
const open = require("open");
const HEADER = '<html>\n<head>\n<link rel="stylesheet" href="http:\/\/lab.hakim.se\/reveal-js\/css\/reveal.css">\n<link rel="stylesheet" href="http:\/\/lab.hakim.se\/reveal-js\/css\/theme\/black.css">\n</head>\n<body>\n<div class="reveal">\n<div class="slides">'
const FOOTER = '</div></div><script src="http:\/\/lab.hakim.se\/reveal-js\/js\/reveal.js"></script><script>Reveal.initialize();</script></body></html>';
const SLIDE_START = "<section>";
const SLIDE_END = '</section>';
const PORT = 4500;
let html = "";
let port;

function run(_port, _html) {
    port = _port || PORT;    
    http.createServer(function (req, res) {
        console.log("Serving....");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(_html);
    }).listen(port);
    open("http://localhost:" + port);
}

function createDevServerPresentation(slidesHtml) {
    html += HEADER;
    slidesHtml.forEach(function (_html) {
        html += SLIDE_START;
        html += _html;
        html += SLIDE_END;
    });
    html += FOOTER;
    return html;
}

module.exports = {
    'run': run,
    'createDevServerPresentation': createDevServerPresentation
};