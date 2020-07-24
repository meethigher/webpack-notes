const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports={
    entry:"./src/js/index.js",
    output:{
        filename:"[name].js",
        path:resolve(__dirname,"build"),
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:["style-loader","css-loader"],

            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:"development",
    // webpack本身是个对象，所以写法顺序无所谓的
    resolve:{
        // 配置解析模块路径别名，优点：写路径时，简写路径。缺点：写代码时没有提示
        alias:{
            // 配置css的绝对路径
            $css:resolve(__dirname,"src/css"),
        },
        // 配置省略文件路径的后缀名
        extensions:[".json",".css"],
        // 告诉webpack解析模块时去找哪个目录，绝对路径，再写一个node_modules是为了防止找不到
        modules:[resolve(__dirname,"../../node_modules"),"node_modules"]
    }
};