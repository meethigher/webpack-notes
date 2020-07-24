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
    entry: ["./src/js/index.js", "./src/index.html"],
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
        // plugins的配置
        // 相当于是引入一个模板
        new HtmlWebpackPlugin({
            template: "./src/index.html"
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
    /**
     * 参数
     * [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
     * 
     * source-map：外部
     *   错误代码准确信息和源代码的错误位置
     * inline-source-map：内联，只生成一个内联的source-map
     *   错误代码准确信息和源代码的错误位置
     * hidden-source-map：外部
     *   错误代码错误原因，但是没有错误位置，不能追踪到源代码的错误，只能提示到构建后代码的位置
     * eval-source-map：也是内联，每一个文件都生成一个source-map   
     *   错误代码准确信息和源代码的错误位置，文件名后缀多了哈希值
     * nosources-source-map：外部
     *   错误代码准确信息，没有任何源代码信息
     * cheap-source-map：外部
     *   错误代码准确信息和源代码的错误位置，错误只能精确到行，不能精确到列
     * cheap-module-source-map：外部
     *   错误代码准确信息和源代码的错误位置，错误只能精确到行，不能精确到列
     *   module会将loader的source-map也加进来
     * 
     * 内联和外部：
     * 1. 外部生成的文件，内联是没有的
     * 2. 内联速度更快
     * 
     * 开发环境：速度快，调试更友好
     *   速度快：eval>inline>cheap>...
     *     eval-cheap-source-map>eval-source-map
     *   调试更友好：
     *     source-map>cheap-module-source-map>cheap-source-map
     *   一般使用eval-source-map/eval-cheap-module-source-map
     * 
     * 生产环境：源代码要不要隐藏？调试要不要更友好？
     *   内联会让代码体积变大，所以在生产环境不用内联
     *   隐藏源代码↓
     *   nosources-source-map
     *   hidden-source-map
     *   一般使用source-map/cheap-module-source-map
     */
    devtool: "inline-source-map"
};
