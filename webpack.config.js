const path = require('path')
const { webpack, ProvidePlugin } = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: {
        main: [
            './src/index.js',
            // './src/layout.js',
        ],
        service: './src/service.js'
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
                test: /\.s?css$/i,
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
