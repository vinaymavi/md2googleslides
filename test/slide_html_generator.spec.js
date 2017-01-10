'use strict';
const path = require('path');
const jsonfile = require('jsonfile');
const nock = require("nock");
const chai = require("chai");
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const SlideHtmlGenerator = require("../src/slide_html_generator");

describe("SlideHtmlGenerator", function () {
    const fixturePath = path.join(path.dirname(__dirname), 'test', 'fixtures');
    const slides = jsonfile.readFileSync(path.join(fixturePath, "mock_slides.json"));
    const slide_html_generator = new SlideHtmlGenerator(slides.slides);
    const slide_html = slide_html_generator.createSlides();
    it("Containt title", function () {
        expect(slide_html[0]).contain("<h1>Title</h1>");
    });
    it("Containt subtitle", function () {
        expect(slide_html[0]).contain("<h2>SubTitle</h2>");
    });
});