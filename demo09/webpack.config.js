const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//设置nodejs的环境变量，此处是用来设置package.json中browserlist以什么模式来兼容
// process.env.NODE_ENV="development";

const miniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "./js/built.js",
        path: resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 创建style标签，将样式放入
                    // "style-loader",
                    // 这个loader取代style-loader。作用：提取css成单独文件
                    miniCssExtractPlugin.loader,
                    "css-loader",
                    /**
                     * css兼容性处理
                     * 需要用到postcss，这需要两个包postcss-loader、postcss-preset-env
                     * 帮助postcss找到package.json中browserlist里面的配置，通过配置加载指定的css兼容性样式
                     */

                    /**
                     * 在browserslist配置下面内容，通过process.env.NODE_ENV="development"，来配置browserslist的运行模式
                     * "browserslist":{
                     * "development":[
                     *    "last 1 chrome version",
                     *    "last 1 firefox version",
                     *    "last 1 safari version"
                     *  ],
                     *  "production":[
                     *    ">0.2%",
                     *    "not dead",
                     *    "no op_mini all"
                     *  ]
                     * }
                     */
                    //两种写法，第一种是默认配置
                    // "post-loader",
                    //第二种修改配置
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: () => [
                                // postcss的插件
                                require("postcss-preset-env")
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new miniCssExtractPlugin({
            // 输出文件
            filename: "./css/built.css"
        })
    ],
    mode: "development"
}