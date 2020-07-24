const {resolve}=require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const miniCssExtractPlugin=require("mini-css-extract-plugin");
module.exports={
    entry:"./src/js/index.js",
    output:{
        filename:"./js/built.js",
        path:resolve(__dirname,"build"),
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    // 创建style标签，将样式放入
                    // "style-loader",
                    // 这个loader取代style-loader。作用：提取css成单独文件
                    miniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        }),
        new miniCssExtractPlugin({
            // 输出文件
            filename:"./css/built.css"
        })
    ],
    mode:"development"
}