const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const terserWebpackPlugin=require("terser-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/[name].[contenthash].js",
        path: resolve(__dirname, "build"),
        chunkFilename:"js/[name].[contenthash].chunk.js"
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
    optimization:{
        splitChunks:{
            chunks:"all",
            // 以下这些都是默认值，一般也不会修改。所以也可以不写
            // 分割的chunk最小是30kb
            minSize:30*1024,
            // 0表示最大没有限制
            maxSize:0,
            // 要提取的chunk最少被引用一次，如果未被引用，不会提取
            minChunks:1,
            // 按需加载时，并行加载的文件最大数量为5
            maxAsyncRequests:5,
            // 入口js文件最大并行请求数量为3个
            maxInitialRequests:3,
            // 名称连接符是~
            automaticNameDelimiter:"~",
            // 可以使用命名规则
            name:true,
            // 分割chunk的组
            cacheGroups:{
                // node_modules中的文件会被打包到vendors这个chunk中。命名-->vendors~xxx.js
                // 同时，也要满足上面的公共规则
                vendors:{
                    test:/[\\/]node_modules[\\/]/,
                    // 优先级
                    priority:-10
                },
                default:{
                    // 要提取的chunk最少被提取两次
                    minChunks:2,
                    // 优先级
                    priority:-20,
                    // 代码能复用。如果当前要打包的模块和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
                    reuseExistingChunk:true
                }
            }
        },
        /**
         * index.js中引用a.js，若a.js发生变化，hash就会变，那么引用a.js的index.js也会变化
         * 下面的代码作用是：将当前模块记录其他模块的hash单独打包成一个文件，叫runtime，这样index.js就不用改了
         * index.js直接引用runtime中的带有hash的内容即可
         */
        runtimeChunk:{
            name:entrypoint=>`runtime-${entrypoint.name}`
        },
        // 配置生产环境的压缩方案:js和css
        // 将来压缩js就使用这个
        minimizer:[
            new terserWebpackPlugin({
                // 开启缓存
                cache:true,
                // 开启多进程打包
                parallel:true,
                // 启动source-map
                sourceMap:true,
            })
        ]
        
    }
};