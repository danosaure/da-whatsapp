const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    cache: false,
    entry: {
        app: './src/index.jsx',
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].min.js'
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ]
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            }
        }]
    },
    optimization: {
        minimize: process.env.NODE_ENV !== 'development'
    }
};
