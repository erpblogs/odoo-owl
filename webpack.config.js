const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
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
            writeToDisk: false,
        },
        static: [{
            directory: path.join(__dirname, 'dist'),
            serveIndex: true,
            watch: true,
        }]
        // contentBase: path.join(__dirname, 'dist')
    }
}