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
             * js基本兼容性处理：babel-loader @babel/preset-env @babel/core
             * 问题：只能转换基本语法，如es6中promise就不能转换
             * 
             * js全部兼容性处理：@babel/polyfill，只需要在index.js中引入即可import "@babel/polyfill";
             * 问题：需求是解决部分兼容，但是所有兼容代码都被引入，体积太大
             * 
             * js部分兼容性处理：按需加载-->core-js
             */
            {
                test:/\.js$/,
                //排除
                exclude:/node_modules/,
                loader:"babel-loader",
                options:{
                    //预设：指示babel做哪些兼容性处理，只有presets:["@babel/preset-env"]这一个表示全部兼容性处理
                    presets:[
                        [
                            "@babel/preset-env",
                            // 按需加载
                            {
                                useBuiltIns:"usage",
                                // 指定corejs版本
                                corejs:{
                                    version:3
                                },
                                // 指定兼容性做到哪个版本浏览器
                                targets:{
                                    chrome:"60",
                                    firefox:"50",
                                    ie:"9",
                                    safari:"10",
                                    edge:"17"
                                }
                            }
                        ]
                    ],
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