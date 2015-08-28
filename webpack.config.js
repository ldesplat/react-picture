'use strict';

var Webpack = require('webpack');

var plugins = [
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new Webpack.optimize.UglifyJsPlugin({
            compressor: {
                'screw_ie8': true,
                warnings: false
            }
        })
    );
}

module.exports = {
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
        }]
    },
    output: {
        library: 'react-picture',
        libraryTarget: 'umd'
    },
    plugins: plugins,
    resolve: {
        extensions: ['', '.js']
    }
};
