var Img = require('..').Image;

var React = require('react/addons');
var ReactTools = require('react-tools');
var Code = require('code');
var Lab = require('lab');

// Test shortcuts
var lab = exports.lab = Lab.script();

var expect = Code.expect;
var before = lab.before;
var after = lab.after;
var describe = lab.experiment;
var it = lab.test;

var Img = require('..').Image;

describe('Image Component', function() {

	it('builds a valid representation from a valid srcSet string', function(done) {
		var TestUtils = React.addons.TestUtils;

		var img = React.renderToStaticMarkup(
			<Img srcSet='http://fancyserver.com/image.jpg 600w, http://fancyserver.com/image2.jpg 1000w' nativeSupport={false} />
		);

		expect(img).to.equal('<img src="http://fancyserver.com/image.jpg">');

		done();
	});
});