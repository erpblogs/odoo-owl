const path = require('path')
const { webpack, ProvidePlugin } = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: [
            './src/home/index.js',
            // './src/assets/scss/style.scss',
        ],
        aboutus: [
            './src/about/index.js',
        ],
        // service: './src/service.js'
    },
    mode: 'development',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[path][name].[ext]'
    },
    resolve: {
        extensions: ['.xml', '.mjs', '.js', '.json']
    },
    devServer: {
        static: [{
            directory: path.join(__dirname, 'dist')
        }],
        compress: true,
        port: 8080,
    },
    plugins: [
        // new ESLintPlugin(),
        new CleanWebpackPlugin(),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            // cần sử dụng khi thêm jsquery library
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new HtmlWebpackPlugin({
            title: 'Odoo Owl!',
            template: './src/home/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            title: 'About us!',
            filename: 'about.html',
            // template: './src/about/index.html',
            chunks: ['aboutus']

        }),
    ],
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
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset',
                parser: {
                    // dung lượng nhỏ hơn 8kb thì chuyển thành base64 để hiển thị
                    dataUrlCondition: {
                        maxSize: 16 * 1024
                    }
                },
            },
            {
                test: /\.(ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/fonts/[hash][ext][query]'
                }

            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            },
            {
                test: /\.scss$/i,
                // type: "asset/resource",
                // generator: {
                //     filename: "static/css/bundle.css",
                // },
                // generator: {
                //     filename: "bundle.css",
                //   },
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== "production"
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                // outputStyle: "compressed",
                                outputStyle: "expanded", // for development
                            },
                        }
                    }
                ],
            },
        ]
    }

    // optimization: {
    //     // Webpack Code Splitting
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // }

}
