var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var EXAMPLES_DIR = path.resolve(__dirname, 'examples');

var isDirectory = function (dir) {
  return fs.lstatSync(dir).isDirectory();
};

var buildEntries = function () {
  return fs.readdirSync(EXAMPLES_DIR).reduce(function (entries, dir) {
    if (dir === 'build') {
      return entries;
    }

    var isDraft = dir.charAt(0) === '_';

    if (!isDraft && isDirectory(path.join(EXAMPLES_DIR, dir))) {
      entries[dir] = path.join(EXAMPLES_DIR, dir, 'app.jsx');
    }

    return entries;
  }, {});
};

module.exports = {

  entry: buildEntries(),

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: 'examples/__build__',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader' }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js')
  ]

};
