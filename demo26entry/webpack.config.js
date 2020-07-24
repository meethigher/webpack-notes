const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/**
 * entry:入口起点
 * 1. string->"./src/index.js" 单入口，打包生成一个chunk。输出一个build文件，此时chunk名称默认为main
 * 2. array->["./src/index.js","./src/add.js"] 多入口，所有文件最终只会生成一个chunk，输出出去只有一个bundle文件
 *    作用：只有在HMR中，让html热更新生效
 * 3. object 多入口，有几个入口文件，就形成几个chunk，并输出几个bundle文件，此时chunk的名称是key
 *    特殊用法->看配置
 * 
 * 第1种和第3种使用较多
 * 
 * 
 * 
 */
module.exports={
    // entry:["./src/index.js","./src/add.js"],
    entry:{
        // 特殊用法
        index:["./src/index.js","./src/sub.js"],
        add:"./src/add.js"
    },
    output:{
        filename:"[name].js",
        path:resolve(__dirname,"build")
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:"development"
};