var path = require('path');
var webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: ['', '.js', '.json']
    },
    entry: [
        path.resolve(__dirname, 'src/index.js'),
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server'
    ],
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot/webpack', 'babel'] },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.css$/, loader: 'style!css' }
        ]
    }
};
