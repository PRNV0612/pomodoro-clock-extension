const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development", 
    devtool: "cheap-module-source-map",
    
    //devtool: 'source-map',
    
    entry: {
        popup: path.resolve('./src/popup/popup.tsx'), 
    },
    module: {
        rules: [
            {
                use: "ts-loader", 
                test: /\.tsx$/,
                exclude: /node_modules/
            }, 
            {
                use: ['style-loader', 'css-loader'], 
                test: /\.css$/i, 
            }
        ]

    }, 
    plugins: [
        new CopyPlugin({
          patterns: [
            { 
                from: path.resolve('src/assets/manifest.json'), 
                to: path.resolve('dist')
            },
            { 
                from: path.resolve('src/assets/icon.png'), 
                to: path.resolve('dist')
            },
          ],
        }),
        new HTMLPlugin({
            title: 'Pomodoro Clock', 
            filename: 'popup.html', 
            chunks: ['popup']
        })
    ], 
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js'
    }
}