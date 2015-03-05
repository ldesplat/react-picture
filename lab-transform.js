var ReactTools = require('react-tools');

module.exports = [{
	ext: '.js',
	transform: function (content, filename) {
		return ReactTools.transform(content);
	}}
];
