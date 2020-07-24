const HtmlWebpackPlugin = require("html-webpack-plugin");
const {resolve}=require("path");
module.exports={
    entry:"./src/js/index.js",
    output:{
        filename:"js/built.js",
        path:resolve(__dirname,"build")
    },
    module:{
        rules:[
            /**
             * 语法检查，需要安装eslint-loader eslint
             * 注意：只检查自己写的源代码，不检查第三方库，通过exclude排除第三方库
             * 设置检查规则：package.json中eslintConfig中设置
             * 推荐使用airbnb规则->eslint-config-airbnb-base eslint eslint-plugin-import
             * 在package.json中进行配置
             * "eslintConfig":{
             *   "extends":"airbnb-base"
             * },
             * 
             * 如果某些js代码需要忽略检查，可以通过添加// eslint-disable-next-line，来使下一行检测失效
             */
            {
                test:/\.js$/,
                exclude:/node-modules/,
                loader:"eslint-loader",
                options:{
                    // 自动修复eslint的错误
                    fix:true
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        }),
    ],
    mode:"development"
}