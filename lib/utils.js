'use strict';


module.exports.getWidth = function () {

    if (typeof window !== 'undefined') {
        return window.innerWidth || document.documentElement.clientWidth;
    }

    return 0;
};


module.exports.getDensity = function () {

    if (typeof window !== 'undefined') {
        return window.devicePixelRatio || 1;
    }

    return 1;
};
