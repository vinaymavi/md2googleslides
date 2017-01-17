'use strict';
/**
 * This file only use to run presentation locally.
 */

const HEADER = '<html>\n<head>\n<linkrel="stylesheet"href="http://lab.hakim.se/reveal-js/css/reveal.css">\n<linkrel="stylesheet"href="http://lab.hakim.se/reveal-js/css/theme/black.css">\n</head>\n<body>\n<divclass="reveal">\n<divclass="slides">'
const FOOTER = '</div></div><scriptsrc="http://lab.hakim.se/reveal-js/js/reveal.js"></script><script>Reveal.initialize();</script></body></html>';
const SLIDE_START = "<section>";
const SLIDE_END = '</section>';
const PORT = 4500;
let html = "";
let port;
function run(_port) {
    port = _port || PORT;

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