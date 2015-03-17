'use strict';

var internals = {};

module.exports.getWidth = internals.getWidth = function () {

    if (typeof window !== 'undefined') {
        return window.innerWidth || document.documentElement.clientWidth;
    }

    return 0;
};


module.exports.getHeight = internals.getHeight = function () {

    if (typeof window !== 'undefined') {
        return window.innerHeight || document.documentElement.clientHeight;
    }

    return 0;
},


module.exports.getDensity = internals.getDensity = function () {

    if (typeof window !== 'undefined') {
        return window.devicePixelRatio || 1;
    }

    return 1;
}
