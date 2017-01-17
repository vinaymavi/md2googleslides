const debug = require('debug')('md2gslides');
const markdownIt = require('markdown-it');
const attrs = require('markdown-it-attrs');
const lazyHeaders = require('markdown-it-lazy-headers');
const emoji = require('markdown-it-emoji');
const expandTabs = require('markdown-it-expand-tabs');
const video = require('markdown-it-video');
const uuid = require('uuid');
const extend = require('extend');
const nativeCSS = require('native-css');
const low = require('lowlight');
const parseColor = require('parse-color');

const markdownTokenRules = {};
const htmlTokenRules = {};

const NO_OP = function() {};
const SLIDE_SEPARATOR = "---"; 

/**
 * Parse the markdown and converts it into a form more suitable
 * for creating slides.
 *
 * Returns an array of objects where each item represents an individual
 * slide.
 *
 * @param {string} markdown
 * @returns {Array.<stirng>}
 */
function extractSlides(markdown) {
    let slides = [];
    let mdArr = slidesMarkdown(markdown);    
    mdArr.forEach(function(slideMarkdown){
        let html = parseMarkdown(slideMarkdown);
        slides.push(html);        
    });
    return slides;
}

function parseMarkdown(markdown) {
    const mdOptions = {
        html: true,
        langPrefix: 'highlight ',
        linkify: false
    };
    const parser = markdownIt(mdOptions)
        .use(attrs)
        .use(lazyHeaders)
        .use(emoji, {shortcuts: {}})
        .use(expandTabs, {tabWidth: 4})
        .use(video, { youtube: { width: 640, height: 390 }});
    return parser.render(markdown);
}
/**
 * @param {string} markdown
 * @returns {Array.<stirng>}
 * TODO attr and other validation testing is pending.
 */
function slidesMarkdown(markdown){
    let mdArr = markdown.split(SLIDE_SEPARATOR);
    mdArr = mdArr.map(function(x){
        if(x.trim().length){
            return x;
        }
    });
    console.log(mdArr);
    return mdArr;
}

module.exports = extractSlides;
