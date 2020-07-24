const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports={
    entry:"./src/index.js",
    output:{
        filename:"[name].js",
        path:resolve(__dirname,"build"),
    },
    module:{
        rules:[
            // loader配置
            {
                test:/\.css$/,
                // 多个loader用use
                use:["style-loader","css-loader"],

            },
            {
                test:/\.js$/,
                // 排除
                exclude:/node_modules/,
                // 包含
                include:resolve(__dirname,"src"),
                // pre优先执行,post延后执行，不写中间执行
                enforce:"pre",
                // 单个loader用loader
                loader:"eslint-loader",
                // 配置，具体看文档
                options:{}
            },
            {
                // 以下配置只会生效一个
                oneOf:[]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:"development"
};