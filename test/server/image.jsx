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


var internals = {
    sampleSrcSet: 'http://fancyserver.com/image.jpg 600w, http://fancyserver.com/image2.jpg 1000w',
    nativeOutput: '<img alt="text" src="http://fancyserver.com/image.jpg" srcset="http://fancyserver.com/image.jpg 600w, http://fancyserver.com/image2.jpg 1000w">',
    renderOutput: '<img alt="text" src="http://fancyserver.com/image.jpg">'
};


var Img = require('../..').Image;

/*
describe('Image Component - Testing as NodeJS', function () {

    it('uses default native support', function(done) {

        var img = React.renderToStaticMarkup(
            React.createElement(Img, {srcSet: internals.sampleSrcSet, alt: 'text'})
        );

        expect(img).to.equal(internals.nativeOutput);

        done();
    });
});
*/