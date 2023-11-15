const path = require('path')
const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const MediaQueryPlugin = require("media-query-plugin")
const devMode = process.env.NODE_ENV !== "production"

const host = process.env.HOST || "localhost";
const port = "9999";

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        main: ['./src/index'],
        // example: './src/example'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@src': path.resolve(__dirname, 'src/'),
        },
        extensions: ['.js', '.jsx', '.css', '.xml', '.json'],
        // restrictions: [/\.(sass|scss|css)$/],
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                // test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    MediaQueryPlugin.loader,
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        }
                    }
                ],
                // options: {
                //     sourceMap: true,
                // },

            },
            {
                test: /\.hbs$/,
                use: [
                    {
                        loader: 'handlebars-loader',
                        options: {
                            helperDirs: [
                                path.resolve(__dirname, 'helpers')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                // type: "asset",
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
        // new ESLintPlugin({
        //     files: 'src/**/*.js',
        //     extensions: ['js']
        // }),
        new HtmlWebpackPlugin({
            title: 'Media Query Example',
            filename: 'index.html',
            template: 'src/index.hbs',
            inject: true,
            'meta': {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
            }
        }),
        // new HtmlWebpackPlugin({
        //     title: 'News',
        //     filename: 'news.html',
        //     template: './src/news.html',
        //     inject: false,
        //     'meta': {
        //         'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
        //     }
        // }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? "[name].css" : "[name].[contenthash].css",
            chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
        }),
        new MediaQueryPlugin({
            include: [
                'example',
                'example2'
            ],
            queries: {
                'print, screen and (min-width: 60em)': 'desktop',
                'print, screen and (min-width: 60em) and (orientation: landscape)': 'desktop'
            }
        })
    ],
    optimization: {
        runtimeChunk: 'single'
    },
    devServer: {
        https: false,
        open: '/',
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