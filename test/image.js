var React = require('react/addons');
var ReactTools = require('react-tools');
var Code = require('code');
var Lab = require('lab');
//var Jsdom = require('jsdom');

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
	nativeOutput: '<img src="http://fancyserver.com/image.jpg" srcset="http://fancyserver.com/image.jpg 600w, http://fancyserver.com/image2.jpg 1000w">',
	renderOutput: '<img src="http://fancyserver.com/image.jpg">',
};

var Img = require('..').Image;

describe('Image Component - Testing as NodeJS', function() {

	it('forces native support off', function(done) {
		var TestUtils = React.addons.TestUtils;

		var img = React.renderToStaticMarkup(
			<Img srcSet={internals.sampleSrcSet} nativeSupport={false} />
		);

		expect(img).to.equal(internals.renderOutput);

		done();
	});

	it('forces native support on', function(done) {
		var TestUtils = React.addons.TestUtils;

		var img = React.renderToStaticMarkup(
			<Img srcSet={internals.sampleSrcSet} nativeSupport={true} />
		);

		expect(img).to.equal(internals.nativeOutput);

		done();
	});

	it('uses default native support', function(done) {
		var TestUtils = React.addons.TestUtils;

		var img = React.renderToStaticMarkup(
			<Img srcSet={internals.sampleSrcSet} />
		);

		expect(img).to.equal(internals.nativeOutput);

		done();
	});
});

describe('Image Component - Pretend to be a browser', function() {
	beforeEach(function (done) {

		internals.createImg = function() {
			return {
				src: '',
				alt: '',
				sizes: '',
				srcset: '',
				'class': ''
			};
		};

		internals.createDocument = function() {
			return {
				createElement: function(elem) {
					if (elem === 'img') {
						return internals.createImg();
					} else {
						return {
							'class': ''
						}
					}
				},

				addEventListener: function(event, handler, bla) {

				},

				removeEventListener: function(event, handler, bla) {

				},

				documentElement: {
					clientWidth: 200,
					clientHeight: 200
				},

			};
		};

		internals.createWindow = function() {
			return {
				innerWidth: 201,
				innerHeight: 201,
				devicePixelRatio: 1.0
			};
		};

		window = internals.createWindow();
		document = internals.createDocument();


		//document = Jsdom.jsdom('<html><head></head><body>Hello World!</body></html>');
		//window = document.parentWindow;
		done();
	});

	afterEach(function(done) {

		window = undefined;
		document = undefined;

		delete internals.createImg;
		delete internals.createDocument;
		delete internals.createWindow;

		done();
	});

	it('native support is on', function(done) {

		var img = React.renderToStaticMarkup(
			<Img srcSet={internals.sampleSrcSet} />
		);

		expect(img).to.equal(internals.nativeOutput);

		done();
	});

	it('supports sizes but not srcset - who has that?', function(done) {
		internals.createImg = function() {
			return {
				src: '',
				alt: '',
				sizes: '',
				'class': ''
			};
		};

		var img = React.renderToStaticMarkup(
			<Img srcSet={internals.sampleSrcSet} />
		);

		expect(img).to.equal(internals.renderOutput);

		done();
	});

	it('supports srcset but not sizes', function(done) {
		internals.createImg = function() {
			return {
				src: '',
				alt: '',
				srcset: '',
				'class': ''
			};
		};

		var img = React.renderToStaticMarkup(
			<Img srcSet={internals.sampleSrcSet} />
		);

		expect(img).to.equal(internals.renderOutput);

		done();
	})


});