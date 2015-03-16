var React = require('react/addons');
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

var Img = require('../..').Image;


var internals = {
    sampleSrcSet: 'http://fancyserver.com/image.jpg 600w, http://fancyserver.com/image2.jpg 1000w',
    nativeOutput: '<img alt="text" src="http://fancyserver.com/image.jpg" srcset="http://fancyserver.com/image.jpg 600w, http://fancyserver.com/image2.jpg 1000w">',
    renderOutput: '<img alt="text" src="http://fancyserver.com/image.jpg">'
};


internals.exDOM = function () {
    return document.getElementById('example');
};


describe('Image Component - JSDOM - Native', function() {

    before(function (done) {

        document.createElement = function (name) {

            var element = Object.getPrototypeOf(this).createElement.call(this);
            if (name === 'img') {
                element.sizes = '';
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


    it('componentWillUnmount', function (done) {

        React.render(<Img/>, internals.exDOM());
        var unmount = React.unmountComponentAtNode(internals.exDOM());
        expect(unmount).to.be.equal(true);
        done();
    });
});
