
class SlideHtmlGenerator {
    /**
     * @param {Array} slides
     */
    constructor(slides) {
        this.slides = slides;
        this.slidesHtml = [];
    }
    /**
     * Generate HTML for all slides.
     * @returns {{Array}} slide
     */
     createSlides() {
        let html;        
        for (let i=0;i<this.slides.length; i++) {
            let slide = this.slides[i];
            html = this.createSlideHtml(slide);
            if (html.length) {
                this.slidesHtml.push(html);
            }
        }
        return this.slidesHtml;
    }
    /**
     * Create HTML for give slide.
     * @returns {{String}}
     */
    createSlideHtml(slide) {
        let html = [];
        html.push("<div>");
        if (slide.title !== null) {
            html.push("<h1>" + slide.title.rawText + "</h1>");
        }
        if (slide.subtitle !== null) {
            html.push("<h2>" + slide.subtitle.rawText + "</h2>");
        }
        html.push("</div>");
        return html.join("");
    }
}
module.exports = SlideHtmlGenerator;