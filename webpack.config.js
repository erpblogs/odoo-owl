const path = require('path')
const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/index', './src/css/style'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            // '@components': path.resolve(__dirname, './src/components'),
            '@components': path.resolve(__dirname, 'src/components/')
        },
        extensions: ['.js', '.css', '.xml', '.json'],
        // restrictions: [/\.(sass|scss|css)$/],
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                rules: [
                    {
                        test: /\.css$/i,
                        // use: [
                        //     'style-loader',
                        //     'css-loader'
                        // ],
                        use: [
                            {loader: 'style-loader', options: {injectType: 'linkTag'}},
                            {loader: 'file-loader', options: {name: '[path][name].[ext]'}},
                        ],
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new ESLintPlugin({
            files: 'src/**/*.js',
            extensions: ['js']
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