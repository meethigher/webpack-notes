const {resolve}=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const webpack=require("webpack");
// 
const addAssetHtmlWebpackPlugin=require("add-asset-html-webpack-plugin");
module.exports={
    entry:"./src/js/index.js",
    output:{
        filename:"js/built.js",
        path:resolve(__dirname,"build"),

    },
    plugins:[
        // plugins的配置
        // html-webpack-plugin
        // 功能：默认会创建一个Html文件，引入打包输出的所有资源（js/css）
        // 需求：需要有结构的html文件
        new HtmlWebpackPlugin({
            // 复制"./src/index.html",并自动引入打包输出的所有资源（js/css）
            template:"./src/index.html"
        }),
        // 告知webpack哪些库不参与打包，同时使用时，名称也需要改
        new webpack.DllReferencePlugin({
            manifest:resolve(__dirname,"dll/manifest.json")
        }),
        // 将某个文件打包输出去，并在html中自动引入该文件
        new addAssetHtmlWebpackPlugin({
            filepath:resolve(__dirname,"dll/jquery.js")
        })
    ],
    mode:"production",
    externals:{
        // 忽略库名以及对应的npm下载的包名
        // 拒绝jquery这个包被打包进来
        jquery:"jQuery"
    }
}