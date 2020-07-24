/**
 * PWA：渐进式网络开发应用程序（离线可访问）
 *  workbox(google开源)-->workbox-webpack-plugin
 */
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const workboxWebpackPlugin=require("workbox-webpack-plugin");
const miniCssExtractPlugin=require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin=require("optimize-css-assets-webpack-plugin");

//设置nodejs的环境变量，此处是用来设置package.json中browserlist以什么模式来兼容
process.env.NODE_ENV = "production";
// 复用loader
const commonCssLoader = [
    miniCssExtractPlugin.loader,
    "css-loader",
    // 兼容性处理
    {
        // 在package.json中需要配置browserslist
        loader: "postcss-loader",
        options: {
            ident: "postcss",
            plugins: () => [
                require("postcss-preset-env")()
            ]
        }
    }
];
module.exports = {
    entry: "./src/js/index.js",
    output: {
        // [name]：取文件名
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, "build")
    },
    module: {
        rules: [
            //提取css文件
            // 兼容性处理
            {
                test: /\.css$/,
                use: [
                    ...commonCssLoader
                ]
            },
            {
                test: /\.less$/,
                use: [
                    ...commonCssLoader,
                    "less-loader"
                ]
            },
            // js兼容性处理
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"babel-loader",
                options:{
                    presets:[
                        [
                            "@babel/preset-env",
                            {
                                useBuiltIns:"usage",
                                corejs:{version:3},
                                targets:{
                                    chrome:"60",
                                    firefox:"50",
                                    ie:"9",
                                    safari:"10",
                                    edge:"17"
                                }
                            }
                        ],
                    ]
                }
            },
            // 处理图片
            {
                test:/\.(jpg|png|gif)$/,
                loader:"url-loader",
                options:{
                    limit:8*1024,//8kb以下进行base64处理
                    name:"[hash:10].[ext]",
                    outputPath:"/imgs",
                    esModule:false
                }
            },
            // 处理html中的图片
            {
                test:/\.html$/,
                loader:"html-loader", 
            },
            // 处理其他文件
            {
                exclude:/\.(js|css|less|html|jpg|png|gif)$/,
                loader:"file-loader",
                options:{
                    outputPath:"/media"
                }
            }

        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: "css/built.css"
        }),
        //压缩css
        new optimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            // 压缩html
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        // 使用
        /**
         * 1. 帮助ServiceWorker快点启动
         * 2. 删除旧的ServiceWorker
         * 
         * 最终生成ServiceWorker的配置文件
         */
        new workboxWebpackPlugin.GenerateSW({
            clientsClaim:true,
            skipWaiting:true
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