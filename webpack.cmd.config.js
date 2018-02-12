const path = require('path');

module.exports = {
    entry: './src/js/commandLine/commandLineSearch.js',
    output: {
        filename: 'wordSearch.js',
        path: path.resolve(__dirname, 'cmd'),
        library: 'wordSearch',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            }
        ]
    }
};