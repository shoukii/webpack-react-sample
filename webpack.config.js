var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var PrettierPlugin = require('prettier-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')


var path = require('path')


module.exports = {

    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main_[hash:8].bundle.js'
    },

    // development, production or none
    mode: 'production',

    //
    devtool: 'source-map',

    // 
    module: {
        rules: [
            // for react js files
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }

                // // 写法2
                // use: [
                //     "babel-loader"
                // ]
                // // 写法3
                // use: [
                //     {
                //         loader: "babel-loader"
                //     }
                // ]
            },

            {
                test: /\.(js|jsx)$/,
                // include: [path.join(__dirname, 'src')],
                exclude: /node_modules/,
                enforce: 'pre',
                use: {
                    loader: 'eslint-loader',
                    options: 
                    {
                        fix: true
                    }
                }

            },

            // for css files
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                use: [
                    // https://webpack.js.org/plugins/mini-css-extract-plugin/#root
                    // 打包是创建独立的css文件
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        // https://webpack.js.org/loaders/css-loader/#modules
                        options: {
                            url: false,
                            modules: true
                        }
                    }
                ],
            },

            // for html files
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            }

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),

        // 将CSS文件独立成单个文件的插件
        new MiniCssExtractPlugin({
            filename: '[name]_[hash:4].css',
            chunkFilename: '[id]_[hash:4].css'
        }),

        // 清除前次打包文件的插件
        new CleanWebpackPlugin(),

        // new PrettierPlugin({
        //     printWidth: 80,               // Specify the length of line that the printer will wrap on.
        //     tabWidth: 2,                  // Specify the number of spaces per indentation-level.
        //     useTabs: false,               // Indent lines with tabs instead of spaces.
        //     semi: true,                   // Print semicolons at the ends of statements.
        //     encoding: 'utf-8',            // Which encoding scheme to use on files
        //     extensions: [ ".js", ".ts" ]  // Which file extensions to process        
        // }),
    ]

}