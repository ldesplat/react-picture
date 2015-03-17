var Code = require('code');
var Lab = require('lab');

// Test shortcuts
var lab = exports.lab = Lab.script();

var expect = Code.expect;
var describe = lab.experiment;
var it = lab.test;

var Utils = require('../../lib/utils');

describe('Utils methods -', function () {

	it('gets height', function (done) {

		var height = Utils.getHeight();
		expect(height).to.equal(0);
		done();
	});

	it('gets width', function (done) {

		var width = Utils.getWidth();
		expect(width).to.equal(0);
		done();
	});

	it('gets density', function (done) {

		var density = Utils.getDensity();
		expect(density).to.equal(1);
		done();
	});
});

describe('Utils methods with document -', function () {

	lab.before(function (done) {

		global.window = {
			devicePixelRatio: 2
		};
		global.document = {
			documentElement: {
				clientWidth: 1024,
				clientHeight: 764
			}
		};

		done();
	});

	lab.after(function (done) {

		delete global.window;
		delete global.document;

		done();
	});

	it('gets height', function (done) {

		var height = Utils.getHeight();
		expect(height).to.equal(764);
		done();
	});

	it('gets width', function (done) {

		var width = Utils.getWidth();
		expect(width).to.equal(1024);
		done();
	});

	it('gets density', function (done) {

		var density = Utils.getDensity();
		expect(density).to.equal(2);
		done();
	});
});
