const path = require('path');

module.exports = {
    mode: "production",
    entry: "./src/hulipaa.js",
    output: {
        path: __dirname + '/dist',
        filename: "hulipaa.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env",]
                }
            }
        },{
            test: /\.svg/,
            type: 'asset/inline'
        }]
    }
}
