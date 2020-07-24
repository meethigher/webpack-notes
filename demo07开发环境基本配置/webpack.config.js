// 这是开发环境配置：能让代码运行起来，在内存中编译打包
/**
 * 运行项目指令：
 * webpack 会将打包结果输出去
 * npx webpack-dev-server 只会在内存中编译打包，没有输出
 */

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, "build")
    },
    module: {
        rules: [
            // loader的配置
            // 处理less资源
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // 处理css资源
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // 处理图片资源
            {
                test: /\.(jpg||png||gif)$/,
                loader: "url-loader",
                options: {
                    limit: 8 * 1024,
                    name: "[hash:10].[ext]",
                    // 设置使用commonjs，不使用es
                    esModule: false,
                    //将图片输出到imgs文件夹
                    outputPath:"imgs"
                }
            },
            // 处理html中的img资源
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            // 处理其他资源
            {
                exclude: /\.(html|css|js|less|jpg|png|gif)$/,
                loader: "file-loader",
                options: {
                    name: "[hash:10].[ext]",
                    // 将其他资源输出到media文件夹
                    outputPath:"media"
                }
            }
        ]
    },
    plugins: [
        // plugins的配置
        // 相当于是引入一个模板
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    mode:"development",
    // devServer
    devServer: {
        disableHostCheck: true,
        contentBase: resolve(__dirname, "build"),
        compress: true,
        port: 8080,
        open: true
    }
}