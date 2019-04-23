var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');


module.exports = {

    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
    },

    // development, production or none
    mode: 'production',

    //
    devtool: 'source-map',

    // 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader'
            // },
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                use: [
                    "style-loader", 
                    {
                        loader: "css-loader",
                        options: { url: false, modules: true }
                    }
                ]
            }


        ]

    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html'
        })
    ]





}