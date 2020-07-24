const { resolve } = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin=require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        filename: "js/built.js",
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
            // js语法检查
            /**
             * 正常来讲，一个文件只能被一个loader处理
             * 当一个文件要被多个loader处理时，那么一定要指定loader执行的先后顺序
             * 先执行eslint，再执行babel
             */
            {
                // 在package.json中需要配置eslintConfig->airbnb
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"eslint-loader",
                // 自动修复语法
                options:{
                    fix:true
                },
                // 优先执行
                enforce:"pre"
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
                    outputPath:"imgs",
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
                    outputPath:"media"
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
            template:"./src/index.html",
            // 压缩html
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }
        })

    ],
    mode: "production",
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