'use strict';

const chai = require('chai');
chai.use(require('chai-as-promised'));
const cheerio = require('cheerio');
const expect = chai.expect;
const nock = require('nock');
const devPresentation = require('../src/dev_presentation');
describe("Dev Server", function () {
    let slidesHtml = [];
    slidesHtml.push('<h1>1Title</h1>\n<h2>SubTitle1</h2>\n<p>This is praragraph1.</p>');
    slidesHtml.push('<h1>Title2</h1>\n<h2>SubTitle2</h2>\n<p>This is paragraph2.</p>');
    let presentationHtml = devPresentation.createDevServerPresentation(slidesHtml);
    let $ = cheerio.load(presentationHtml);
    it("Presentation created", function () {
        expect($('html').length).to.be.equal(1);
    });

    it("Slides created.", function () {
        expect($('section').length).to.be.equal(2);
    });
    it("Run Slide",function(){
        devPresentation.run(3000,presentationHtml);
        expect(1).to.be.equal(1);
    });
});