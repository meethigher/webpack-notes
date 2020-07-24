/**
 * 使用dll技术，对某些库（第三方库，如jquery、react、vue...）进行单独打包
 * 当使用webpack命令时，默认查找webpack.config.js文件 
 * 而我们需要运行webpack.dll.js，所以指令要改成 webpack --config webpack.dll.js
 */
const {resolve}=require("path");
const webpack=require("webpack");
module.exports={
    entry:{
        //最终打包生成的[name]是jquery
        //["jquery"]->要打包的库是jquery 
        jquery:["jquery"]
    },
    output:{
        filename:"[name].js",
        path:resolve(__dirname,"dll"),
        library:"[name]_[hash]",//打包的库向外暴露出的库的名字
    },
    plugins:[
        // 打包生成manifest.json->提供jquery的映射关系
        new webpack.DllPlugin({
            name:"[name]_[hash]",//映射库的暴露的内容名称
            path:resolve(__dirname,"dll/manifest.json"),//输出文件路径
        })
    ],
    mode:"production"
}