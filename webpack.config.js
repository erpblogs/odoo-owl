'use strict'

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';

    return {
        mode: 'development',
        entry: './src/js/main.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist')
        },
        devServer: {
            static: path.resolve(__dirname, 'dist'),
            port: 8080,
            hot: true
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './src/index.html' }),
            new miniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
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
                    // generator: {
                    //     filename: 'static/images/[hash][ext][query]'
                    // }
                },
                {
                    test: /\.(ttf|woff|woff2)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/fonts/[hash][ext][query]'
                    }
    
                },
                // Configure Webpack to extract inline SVG files.
                // Bootstrap’s CSS includes multiple references to SVG files via inline data: URIs. If you define a Content Security Policy for your project that blocks data: URIs for images, then these SVG files will not load.  
                {
                    mimetype: 'image/svg+xml',
                    scheme: 'data',
                    type: 'asset/resource',
                    generator: {
                        filename: 'icons/[hash].svg'
                    }
                },
                {
                    test: /\.(scss)$/,
                    use: [
                        {
                            // Adds CSS to the DOM by injecting a `<style>` tag
                            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        },
                        {
                            // Interprets `@import` and `url()` like `import/require()` and will resolve them
                            loader: 'css-loader'
                        },
                        {
                            // Loader for webpack to process CSS with PostCSS
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        autoprefixer
                                    ]
                                }
                            }
                        },
                        {
                            // Loads a SASS/SCSS file and compiles it to CSS
                            loader: 'sass-loader'
                        }
                    ]
                }
            ]
        }
    }
}