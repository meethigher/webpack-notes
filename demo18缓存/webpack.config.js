/**
 * 缓存
 *   1. babel缓存
 *     cacheDirectory:true
 *     -->让第二次打包构建速度更快
 *   2. 文件资源缓存，文件名添加哈希值
 *     hash
 *     问题：因为js和css同时使用一个哈希值，如果重新打包，会导致所有缓存失效（可能只改动了一个文件）
 * 
 *     chunkhash：根据chunk生成的hash，如果打包来源于同一个chunk，那么hash就一样
 *     问题：js和css的hash还是一样的
 *         因为css是在js中被引入的，同属于一个chunk
 * 
 *     contenthash：根据文件内容生成hash。不同文件hash一定不一样
 *     -->让代码上线运行缓存更好使用
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
    mode: "development",
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