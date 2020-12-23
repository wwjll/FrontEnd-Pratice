const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: resolve(__dirname, 'src/app.js'),
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'app[hash:16].js',
    },
    devtool: "source-map",
    // resolveLoader: {
    //     modules: ['node_module', resolve(__dirname, "loaders")]
    // },
    module: {
        rules: [ 
            {
                test: /\.tpl$/,
                use: [
                    "babel-loader",
                    {
                       loader: "tpl-loader",
                       options: {
                           log: true
                       }
                    }
                ]
                
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "src/index.html")
        })
    ],
    devServer: {
        inline: false,
        port: 3333
    }
}