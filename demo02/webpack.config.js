/*
 webpack.config.js webpack的配置文件
    作用：指示webpack工作（当运行webpack指令时，会加载里面的配置）
    所有构建工具都是基于nodejs平台运行的，src下源码采用es6，而模块化（比如webpack.config.js）默认采用commonjs
*/

// resolve用来拼接路径的方法
const { resolve } = require("path");
module.exports = {
    //webpack配置

    //入口起点
    entry: "./src/index.js",
    //输出
    output: {
        // 输出文件名
        filename: "build.js",
        // 输出路径 _dirname是nodejs的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, "build")
    },
    // loader的配置
    module: {
        rules: [

            // 详细的loader配置
            // 不同文件必须配置不同loader处理
            // 配置css
            {
                // 正则匹配文件
                test:/\.css$/,
                // 使用哪些loader进行处理
                use:[
                    // use数组中loader执行顺序：从右到左，从下到上，依次执行
                    // 创建style标签，将js中的css样式资源插入进去，添加到head中生效
                    "style-loader",
                    // 将css文件变成一个commonjs的模块加载到js中，里面的内容是样式的字符串
                    "css-loader"
                ]

            },
            // 配置less
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    // 将less文件编译为css文件
                    "less-loader"
                ]
            }
        ]

    },
    // plugins的配置
    plugins: [
        // 详细的plugins配置
    ],
    // 模式
    mode: "development",//开发模式
    // mode: "production"
}

