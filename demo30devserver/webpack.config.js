const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "[name].js",
        path: resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],

            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: "development",
    resolve: {
        alias: {
            $css: resolve(__dirname, "src/css"),
        },
        extensions: [".json", ".css"],
        modules: [resolve(__dirname, "../../node_modules"), "node_modules"]
    },
    devServer:{
        // 运行代码的目录
        contentBase:resolve(__dirname,"build"),
        // 监视ContentBase目录 目录下的所有文件，一旦文件变化就会reload重载
        watchContentBase:true,
        // 配置
        watchOptions:{
            // 忽略文件
            ignored:/node_modules/
        },
        // 启动gzip压缩
        compress:true,
        // 端口号
        port:8080,
        // 域名
        host:"localhost",
        // 自动打开
        open:true,
        // 开启hmr功能
        hot:true,
        // 日志，不要显示启动服务器时的日志
        clientLogLevel:"none",
        // 除了基本启动信息以外，其他内容都不打印
        quiet:true,
        // 如果出现错误，不要全屏提示
        overlay:false,
        // 服务器代理，解决开发环境跨域问题
        proxy:{
            // 一旦服务器8080接收到/api请求，就会自动把请求转发到另一个服务器8000
            "/api":{
                target:"http://localhost:8000",
                // 发送请求时，请求路径重写：将/api/xxx-->/xxx(去掉/api)
                pathRewrite:{
                    "^/api":""
                }
            }
        }
    }
};