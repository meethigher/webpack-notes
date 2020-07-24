

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//设置nodejs的环境变量，此处是用来设置package.json中browserlist以什么模式来兼容
process.env.NODE_ENV = "production";



module.exports = {
    // 单入口
    // entry: "./src/js/index.js",
    // 多入口js:有一个入口，最终输出就有一个bundle；有多个，输出就会有多个
    entry: { 
        index: "./src/js/index.js", 
        test: "./src/js/test.js" 
    },
    output: {
        // [name]：取文件名
        filename: 'js/[name].[contenthash:10].js',
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
                    outputPath: "imgs"
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
                    outputPath: "media"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            // 压缩html
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    /**
     * 单入口时，可以设置下面代码，将node_modules中代码单独打包成一个chunk最终输出
     * 多入口时，自动分析多入口chunk中，有没有公共的文件（如果文件太小，还是会打包成一个整的）。如果有，会打包成一个单独的chunk
     */
    optimization:{
        splitChunks:{
            chunks:"all"
        }
    },
    mode: "production",
    // devServer
    devServer: {
        disableHostCheck: true,
        contentBase: resolve(__dirname, "build"),
        compress: true,
        port: 8080,
        open: true,
        // 开启HMR功能，并重启服务
        hot: true
    }
};