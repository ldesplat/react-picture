var Code = require('code');
var Lab = require('lab');

// Test shortcuts
var lab = exports.lab = Lab.script();

var expect = Code.expect;
var describe = lab.experiment;
var it = lab.test;

var Utils = require('../../lib/utils');

describe('Utils methods -', function () {

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

    it('gets width with document.documentElement', function (done) {

        global.window = {};
        global.document = {
            documentElement: {
                clientWidth: 1024
            }
        };

        var width = Utils.getWidth();

        delete global.window;
        delete global.document;

        expect(width).to.equal(1024);
        done();
    });

    it('gets width with window.innerWidth', function (done) {

        global.window = {
            innerWidth: 256
        };

        var width = Utils.getWidth();

        delete global.window;

        expect(width).to.equal(256);
        done();
    });


    it('gets density with window.devicePixelRatio', function (done) {

        global.window = {
            devicePixelRatio: 2
        };

        var density = Utils.getDensity();

        delete global.window;

        expect(density).to.equal(2);
        done();
    });

    it('gets density with window but no devicePixelRatio', function (done) {

        global.window = {};

        var density = Utils.getDensity();

        delete global.window;

        expect(density).to.equal(1);
        done();
    });
});
