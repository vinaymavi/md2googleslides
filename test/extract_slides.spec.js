'use strict';

const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const nock = require('nock');
const extractSlides = require('../src/extract_slides');

describe('extractSlides', function() {
    describe('with a title slide', function() {
        const markdown =
            '# Title\n' +
            '## Subtitle\n'+
            'This is paragraph text.\n'+
            '---'+
            '# Title2\n' +
            '## Subtitle2\n'+
            'This is paragraph text2.\n';
        const slides = extractSlides(markdown);
        it('should return two slide', function() {
            return expect(slides).to.have.length(2);
        });  
    });    
});