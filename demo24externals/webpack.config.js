const {resolve}=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
module.exports={
    entry:"./src/js/index.js",
    output:{
        filename:"js/build.js",
        path:resolve(__dirname,"build"),

    },
    module:{
        rules:[

        ],
        
    },
    plugins:[
        // plugins的配置
        // html-webpack-plugin
        // 功能：默认会创建一个Html文件，引入打包输出的所有资源（js/css）
        // 需求：需要有结构的html文件
        new HtmlWebpackPlugin({
            // 复制"./src/index.html",并自动引入打包输出的所有资源（js/css）
            template:"./src/index.html"
        })
    ],
    mode:"production",
    externals:{
        // 忽略库名以及对应的npm下载的包名
        // 拒绝jquery这个包被打包进来
        jquery:"jQuery"
    }
}