const path = require('path')
const { webpack, ProvidePlugin } = require('webpack')

module.exports = {
    entry: {
        main: [
            './src/index.js',
            './src/layout.js',
        ],
        service: './src/service.js'
    },
    mode: 'development',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: [{
            directory: path.join(__dirname, 'dist')
        }],
        compress: true,
        port: 8080,
    },
    plugins: [
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],

}
