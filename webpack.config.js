const path = require('path');

module.exports = function (env) {
    const lib = {
        entry: "./src",
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: "ts-loader"
                },
            ]
        },
        output: {
            path: path.resolve(__dirname, './lib'),
            filename: 'lazy-var.js',
            library: {
                type: "commonjs2",
            },
        },
        optimization: {
            minimize: true
        },
    };
    return [lib];
}

module.exports.createTestConfiguration = function () {
    return {
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: "ts-loader"
                },
            ]
        }
    };
}