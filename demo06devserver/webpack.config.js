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
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            // 打包其他资源(除了HTML/JS/CSS资源以外的资源)
            {
                // 排除css/js/html/less资源
                exclude: /\.(css|js|html|less)$/,
                loader: "file-loader",
                options: {
                    name: '[hash:5].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    mode: "development",
    // 开发服务器devServer：用来自动化（自动编译、自动打开浏览器，自动刷新浏览器）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer指令为：npx webpack-dev-server
    devServer: {
        // 跳过检查
        // 如果是false，则只能访问localhost:3000,
        // 如果是true，则都可以访问，比方说meethigher.com:3000
        disableHostCheck: true,

        // 默认打开本地的浏览器
        open:true,
        contentBase: resolve(__dirname, "build"),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 8080
    }
}