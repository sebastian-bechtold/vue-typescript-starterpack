var path = require('path')
var webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },

    module: {
        rules: [
            {

                test: /\.(css|scss)$/,

                /*
                sass-loader - Transforms Sass to CSS. (Input: Sass, Output: CSS)
                css-loader - Transforms CSS to a JavaScript module. (Input: CSS, Output: JavaScript)
                style-loader - Injects the CSS, that is exported by the JavaScript module, into a <style> tag at runtime. (Input: JavaScript, Output: JavaScript).
          
                // Source: https://stackoverflow.com/questions/43913420/css-loader-vs-style-loader-vs-sass-loader
                */
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                /*
                options: {
                    esModule: true
                }
                */
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },           
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        
        new webpack.VueLoaderPlugin()
    ])
}
