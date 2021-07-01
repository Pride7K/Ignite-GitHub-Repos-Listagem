const path = require("path")
const HtmlWebPack = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts",".tsx"],
    },
    mode: isDevelopment ? "development" : "production",
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin({

        }),
        new HtmlWebPack({
            template: path.resolve(__dirname, "public", "index.html")
        })
    ].filter(Boolean),
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx$/,
                exclude: /node_modules/,
                use: {
                    loader:"babel-loader",
                    options:{
                        plugins:[
                            isDevelopment &&  require.resolve("react-refresh/babel"),
                        ].filter(Boolean)
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
        ]
    }
}