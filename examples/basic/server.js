var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var Config = require('./webpack.config');

new WebpackDevServer(Webpack(Config), {
    publicPath: Config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    }
}).listen(3000, 'localhost', function (err) {

    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:3000');
});
