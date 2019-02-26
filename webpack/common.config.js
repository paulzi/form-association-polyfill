const path = require('path');

module.exports = () => { return {
    entry: {
        'form-association-polyfill': './standard.js',
        'form-association-polyfill-with-shims': './with-shims.js',
        'form-association-polyfill-register': './register.js',
        'form-association-polyfill-register-with-shims': './register-with-shims.js',
    },
    stats: {
        children: false,
        modules: false,
        entrypoints: false,
        hash: false,
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        library: 'FormAssociationPolyfill',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    }
                ]
            }
        ]
    },
}};