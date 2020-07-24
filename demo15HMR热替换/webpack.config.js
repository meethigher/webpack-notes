/**
 * 问题：只修改部分内容，结果所有内容都重新加载
 * 
 * HMR:hot module replacement 热模块替换/模块热替换
 * 作用：一个模块发生变化，只会重新打包这一个模块，而不是打包所有
 * 极大地提升构建速度
 *
 * 样式文件：可以使用HMR，因为style-loader内部实现了
 * js文件：默认没HMR功能->需要修改js代码，添加支持HMR功能的代码
 *   只能处理非入口js文件
 * html文件：默认没HMR功能，同时会导致问题->html不能热更新了(因为实际使用中只有一个index.html，不像js有多个模块，所以不用做hmr功能)
 *   解决：修改entry入口，将html文件引入，但是会全部刷新
 */

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: ["./src/js/index.js","./src/index.html"],
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
        open: true,
        // 开启HMR功能，并重启服务
        hot:true
    }
}