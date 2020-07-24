/**
 * tree shaking：去除无用代码
 *  前提：1. 必须使用es6模块化 2. 开启production环境
 *  作用：减少代码体积
 * 
 *  在package.json中配置"sideEffects":false，表示所有代码都没有副作用，都可以进行treeshaking
 *  问题：可能会把css/@babel/polyfill干掉，因为没有使用
 *  可以进行标记
 *  "sideEffects":["*.css","*.less"]
 */

const { resolve } = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
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
    entry: ["./src/js/index.js", "./src/index.html"],
    output: {
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname, "build")
    },
    module: {
        rules: [
            // js语法检查
            /**
             * 正常来讲，一个文件只能被一个loader处理
             * 当一个文件要被多个loader处理时，那么一定要指定loader执行的先后顺序
             * 先执行eslint，再执行babel
             */
            {
                // 在package.json中需要配置eslintConfig->airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                // 自动修复语法
                options: {
                    fix: true
                },
                // 优先执行
                enforce: "pre"
            },
            {
                //以下loader只会匹配一个，用来优化打包速度
                //注意：不能有两个配置处理同一种类型文件，所以需要将重复内容提取出来
                oneOf: [
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
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        useBuiltIns: "usage",
                                        corejs: { version: 3 },
                                        targets: {
                                            chrome: "60",
                                            firefox: "50",
                                            ie: "9",
                                            safari: "10",
                                            edge: "17"
                                        }
                                    }
                                ],
                            ],
                            // 开启babel缓存
                            cacheDirectory:true
                        }
                    },
                    // 处理图片
                    {
                        test: /\.(jpg|png|gif)$/,
                        loader: "url-loader",
                        options: {
                            limit: 8 * 1024,//8kb以下进行base64处理
                            name: "[hash:10].[ext]",
                            outputPath: "/imgs",
                            esModule: false
                        }
                    },
                    // 处理html中的图片
                    {
                        test: /\.html$/,
                        loader: "html-loader",
                    },
                    // 处理其他文件
                    {
                        exclude: /\.(js|css|less|html|jpg|png|gif)$/,
                        loader: "file-loader",
                        options: {
                            outputPath: "/media"
                        }
                    }

                ]
            }
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: "css/built.[contenthash:10].css"
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
        })
    ],
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
    },
    // source-map:一种提供源代码到构建后代码映射技术（如果构建后代码出错了，通过映射关系可以追踪到源代码错误）
    devtool: "inline-source-map"
};