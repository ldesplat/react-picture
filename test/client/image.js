/*var React = require('react/addons');
var Code = require('code');
var Lab = require('lab');

// Test shortcuts
var lab = exports.lab = Lab.script();

var expect = Code.expect;
var before = lab.before;
var after = lab.after;
var beforeEach = lab.beforeEach;
var afterEach = lab.afterEach;
var describe = lab.experiment;
var it = lab.test;

var Img = require('../../lib/index').Image;


var internals = {
    sampleSrcSet: 'http://fancyserver.com/image.jpg 600w, http://fancyserver.com/image2.jpg 1000w'
};


internals.exDOM = function () {

    return document.getElementById('example');
};


describe('JSDOM - Native -', function () {

    before(function (done) {

        document.createElement = function (name) {

            var element = Object.getPrototypeOf(this).createElement.call(this);
            if (name === 'img') {
                element.srcset = '';
            }

            return element;
        };

        done();
    });


    after(function (done) {

        document.createElement = function (name) {

            return Object.getPrototypeOf(this).createElement.call(this);
        };

        done();
    });

    afterEach(function (done) {

        React.unmountComponentAtNode(internals.exDOM());
        done();
    });


    it('renders a null image', function (done) {

        React.render(<Img/>, internals.exDOM());
        expect(internals.exDOM().innerHTML).to.not.contain('img');
        done();
    });


    it('render a proper image', function (done) {

        React.render(<Img srcSet={internals.sampleSrcSet} alt='text'/>, internals.exDOM());
        var html = internals.exDOM().innerHTML;

        expect(html).to.contain('alt="text"');
        expect(html).to.contain('src="http://fancyserver.com/image.jpg"');
        expect(html).to.contain('srcset="http://fancyserver.com/image.jpg 600w, http://fancyserver.com/image2.jpg 1000w"');
        done();
    });
});

describe('JSDOM - Not native -', function () {

    afterEach(function (done) {

        React.unmountComponentAtNode(internals.exDOM());
        done();
    });


    it('renders a null image', function (done) {

        React.render(<Img/>, internals.exDOM());
        expect(internals.exDOM().innerHTML).to.not.contain('img');
        done();
    });


    it('render a proper image', function (done) {

        React.render(<Img srcSet={internals.sampleSrcSet} alt='text'/>, internals.exDOM());
        var html = internals.exDOM().innerHTML;

        expect(html).to.contain('alt="text"');
        expect(html).to.contain('src="http://fancyserver.com/image2.jpg"');
        expect(html).to.not.contain('srcset');
        done();
    });

});
*/
