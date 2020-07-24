import "../css/index.less";
import print from "./print.js"

console.log("index.js被加载了"+new Date().toLocaleString());
function add(x,y){
    return x+y;
}
print();
console.log(add(1,2));

// 全局找hot属性，一旦为true，说明开启了HMR功能，->让HMR功能生效
if(module.hot){
    // 如果后续还有其他模块，同样的方法
    module.hot.accept("./print.js",function (){
        // 方法会监听 print.js文件的变化，一旦发生变化，其他模块不会重新打包构建
        //会执行后面的回调函数
        print();
    })
}
