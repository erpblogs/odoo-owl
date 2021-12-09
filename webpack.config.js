const path = require('path')

module.exports = {
    entry: {
        main: './src/index.js',
        header: './src/header.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        https: false,
        open: '/',
        compress: true,
        hot: true,
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