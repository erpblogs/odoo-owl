const path = require('path')
const webpack = require('webpack')
// const ESLintPlugin = require('eslint-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const MediaQueryPlugin = require("media-query-plugin")
// const devMode = process.env.NODE_ENV !== "production"

const host = process.env.HOST || "localhost";
const port = "9999";
const publicPath = '/assets/';

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    title: 'Home Page',
    filename: 'index.html',
    template: 'src/index.html',
    inject: true,
    'meta': {
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
    }
})

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        main: [
            './src/index', './src/example'
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: publicPath,
        filename: '[name].js',
        // filename: '[name]-[fullhash:8].js',
        // sourceMapFilename: '[name]-[fullhash:8].map',
        // chunkFilename: '[id]-[fullhash:8].js'
    },
    // resolve: {
    //     alias: {
    //         '@components': path.resolve(__dirname, 'src/components/'),
    //         '@src': path.resolve(__dirname, 'src/'),
    //         '@assets': path.resolve(__dirname, 'src/assets/'),
    //     },
    //     extensions: ['.js', '.jsx', '.css', '.xml', '.json'],
    //     // restrictions: [/\.(sass|scss|css)$/],
    // },

    // module: {
    //     rules: [
    //         {
    //             test: /\.m?js$/,
    //             // test: /\.jsx?$/,
    //             exclude: /(node_modules|bower_components)/,
    //             use: {
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: ['@babel/preset-env'],
    //                 }
    //             }
    //         },
    //         {
    //             test: /\.(sa|sc|c)ss$/i,
    //             use: [
    //                 MiniCssExtractPlugin.loader,
    //                 MediaQueryPlugin.loader,
                    
    //                 {
    //                     loader: 'css-loader',
    //                     options: {
    //                         url: true,
    //                         import: true,
    //                         sourceMap: true,
    //                     }
    //                 },
    //                 "postcss-loader",
    //                 "sass-loader",
    //             ],
    //             // sideEffects: true, 
    //             // include: path.join(__dirname, 'src'),
                
    //         },
    //         // {
    //         //     test: /\.hbs$/,
    //         //     use: [
    //         //         {
    //         //             loader: 'handlebars-loader',
    //         //             options: {
    //         //                 helperDirs: [
    //         //                     path.resolve(__dirname, 'helpers')
    //         //                 ]
    //         //             }
    //         //         }
    //         //     ]
    //         // },
    //         {
    //             test: /\.(png|jpe?g|gif|svg|eot)$/i,
    //             use: [
    //                 {
    //                     loader: 'file-loader',
    //                     options: {
    //                         // name: '[path][name].[ext]',
    //                         // name: 'assets/[name].[ext]',
    //                         name: 'images/[name].[ext]',

    //                         publicPath: 'assets/images',
    //                         outputPath: 'assets'
    //                     },
    //                 }
    //             ],
    //         },
    //         {
    //             test: /\.(ttf|woff|woff2)$/,
    //             use: {
    //                 loader: 'file-loader',
    //                 options: {
    //                     name: 'fonts/[name].[hash:6].[ext]',
    //                     publicPath: 'assets/fonts',
    //                     outputPath: 'assets'
    //                 },
    //             },
    //         }
    //     ]
    // },
    plugins: [
        HTMLWebpackPluginConfig
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.$': 'jquery',
        //     'window.jQuery': 'jquery'
        // }),
        // new ESLintPlugin({
        //     files: 'src/**/*.js',
        //     extensions: ['js']
        // }),
        
        // new HtmlWebpackPlugin({
        //     title: 'News',
        //     filename: 'news.html',
        //     template: './src/news.html',
        //     inject: false,
        //     'meta': {
        //         'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
        //     }
        // }),
        // new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: "assets/css/[name].css",
        //     // filename: devMode ? "[name].css" : "[name].[contenthash].css",
        //     // chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
        // }),
        // new MediaQueryPlugin({
        //     include: [
        //         'example',
        //         'example2'
        //     ],
        //     queries: {
        //         'print, screen and (min-width: 60em)': 'desktop',
        //         'print, screen and (min-width: 60em) and (orientation: landscape)': 'desktop'
        //     }
        // })
    ],
    optimization: {
        runtimeChunk: 'single'
    },
    devServer: {
        https: false,
        // open: '/',
        compress: true,
        hot: false,
        port,
        host,
        proxy: {
            '/api': 'http://localhost:9999'
        },
        headers: { 'Access-Control-Allow-Origin': '*' },
        // watchFiles: [ '../templates/**/*.*', '../src/**/*.*' ],
        devMiddleware: {
            writeToDisk: true,
        },
        static: [{
            directory: path.join(__dirname, 'dist'),
            serveIndex: false,
            watch: true,
        }]
        // contentBase: path.join(__dirname, 'dist')
    }
}