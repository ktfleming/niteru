const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "style.css"
});

module.exports = {
    entry: [
        "./ts/index.tsx"
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/public/javascripts"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.scss$/,
                loader: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|gif)(\?\S*)?$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        extractSass
    ]
};