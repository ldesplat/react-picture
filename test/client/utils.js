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

var Utils = require('../../lib/utils');

describe('Utils methods -', function () {

	it('gets height', function (done) {

		var height = Utils.getHeight();
		expect(height).to.equal(768);
		done();
	});

	it('gets width', function (done) {

		var width = Utils.getWidth();
		expect(width).to.equal(1024);
		done();
	});

	it('gets density', function (done) {

		var density = Utils.getDensity();
		expect(density).to.equal(1);
		done();
	});
});
