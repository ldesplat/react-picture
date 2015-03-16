var Jsdom = require('jsdom');


global.document = Jsdom.jsdom('<html><body><div id="example"></div></body></html>');
global.window = global.document.parentWindow;
global.navigator = global.window.navigator;
global.document.body.classList = {
    add: function () {},
    remove: function () {}
};
