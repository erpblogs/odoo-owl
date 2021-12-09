const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    devServer: {
        https: false,
        // open: '/',
        compress: true,
        hot: false,
        port: 9999,
        host: 'localhost',
        proxy: {
            '/api': 'http://localhost:9999'
        },
        headers: {'Access-Control-Allow-Origin': '*'},
        // watchFiles: [ '../templates/**/*.*', '../src/**/*.*' ],
        devMiddleware: {
            writeToDisk: true,
        },
        static: [{
            directory: path.join(__dirname, 'dist'),
            serveIndex: false,
            watch: false,
        }]
        // contentBase: path.join(__dirname, 'dist')
    }
}