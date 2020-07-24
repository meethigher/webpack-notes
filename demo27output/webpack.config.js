const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports={
    entry:"./src/index.js",
    output:{
        //文件名称（指定名称+目录）
        filename:"[name].js",
        // 输出文件目录（将来所有资源输出的公共目录）
        path:resolve(__dirname,"build"),
        // 所有资源引入公共路径前缀，如引入路径是"imgs/a.jpg"就会变成"/imgs/a.jpg"
        publicPath:"/",
        // entry中的就是入口chunk，像import这种就是非入口chunk
        chunkFilename:"[name]_chunk.js",//非入口chunk的名称,
        // 除非使用dll，正常打包一般不用library
        // library:"[name]",//将库以变量名暴露出去
        // libraryTarget:"window",//将变量名添加到browser上
        // libraryTarget:"global",//将变量名添加到node上
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:"development"
};