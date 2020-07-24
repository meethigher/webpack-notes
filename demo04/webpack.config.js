const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',

                ]
            },
            // 问题：处理不了html中的img图片
            // 处理图片资源
            {
                test:/\.(jpg|png|gif)$/,
                // 只需使用一个loader即可
                // 需要下载url-loader和file-loader
                loader:"url-loader",
                options:{
                    // 当发现图片大小，小于8kb时，就会被base64处理
                    // 优点：减少请求数量，减轻服务器压力
                    // 缺点：图片体积会变大大（导致文件请求速度变慢，所以一般只处理小图片，8-12kb的图片），之前5kb，转换为base64，就会变成8kb，类似等等
                    limit:8*1024,
                    /**
                     * 问题：因为url-loader的es6模块化，使用commonjs解析，而html-loader引入图片使用的是commonjs
                     * 解析时会出问题：[Object Module]
                     * 解决：关闭url-loader的es6模块化，使用commonjs解析
                     */
                    esModule:false,
                    // 设置图片名字格式
                    // hash:10 取图片哈希值前5位
                    // ext 取文件的原扩展名
                    // 发现重复文件的时候，不会覆盖，而会保留原文件
                    name:"[hash:5].[ext]"
                }
            },
            {
                test:/\.html$/,
                //处理html文件的img图片（负责引入图片，从而能被url-loader处理）
                loader:"html-loader"

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    mode:"development"
}