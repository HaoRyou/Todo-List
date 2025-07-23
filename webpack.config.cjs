const path = require("path");
const HtmlwebpackPlugin = require("html-webpack-plugin");


module.exports = {
    mode: "development",
    entry: "./src/main.js",
    output: {
        filename:"main.js",
        path: path.resolve(__dirname,"dist"),
        clean: true,
    },
    devtool:"eval-source-map",
    devServer:{
        watchFiles:["./src/index.html"],
        port:3000
    },
    plugins:[
        new HtmlwebpackPlugin({
            filename:"index.html",
            template:"./src/index.html"
        }),
    ],
    module:{
        rules:[
            {
                test:/\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test:/\.html$/i,
                loader:"html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
};