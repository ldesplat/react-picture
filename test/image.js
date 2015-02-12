var React = require('react/addons');
var ReactTools = require('react-tools');
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
	nativeOutput: '<img src="http://fancyserver.com/image.jpg" srcset="http://fancyserver.com/image.jpg 600w, http://fancyserver.com/image2.jpg 1000w">',
	renderOutput: '<img src="http://fancyserver.com/image.jpg">',

	createImg: function() {
		return {
			src: '',
			alt: '',
			sizes: '',
			srcset: '',
			'class': ''
		};
	},

	createDocument: function() {
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
			}
		};
	},

	createWindow: function() {
		return {
			innerWidth: 201,
			innerHeight: 201,
			devicePixelRatio: 1.0
		};
	}
};

var Img = require('..').Image;

describe('Image Component', function() {

	it('builds a valid representation from a valid srcSet string', function(done) {
		var TestUtils = React.addons.TestUtils;

		var img = React.renderToStaticMarkup(
			<Img srcSet={internals.sampleSrcSet} nativeSupport={false} />
		);

		expect(img).to.equal(internals.renderOutput);

		done();
	});

	it('builds a valid representation from a valid srcSet string', function(done) {
		var TestUtils = React.addons.TestUtils;

		var img = React.renderToStaticMarkup(
			<Img srcSet={internals.sampleSrcSet} />
		);

		expect(img).to.equal(internals.nativeOutput);

		done();
	});

	describe('Pretend to be a browser', function() {
		beforeEach(function (done) {

			window = internals.createWindow();
			document = internals.createDocument();

			done();
		});

		afterEach(function(done) {

			window = undefined;
			document = undefined;

			done();
		});

		it('pretend we are a browser with native support', function(done) {

			var img = React.renderToStaticMarkup(
				<Img srcSet={internals.sampleSrcSet} />
			);

			expect(img).to.equal(internals.nativeOutput);

			done();
		});


	});
});