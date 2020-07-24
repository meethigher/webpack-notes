import "../css/index.less";
console.log("indexjs文件被加载了");
// import {mul} from "./test";
document.getElementById("btn").onclick = function () {
    // 懒加载：当文件需要使用时，才加载文件。这个方法不会进行重复加载，第一次加载之后，就会将数据保存到缓存
    // 预加载：会在使用之前，提前加载js文件
    /**
     * 正常加载可以认为是并行加载，同一时间加载多个js文件，文件即使不用，也会加载
     * 预加载是等其他资源加载完毕，浏览器空闲了，再进行加载。兼容性非常差，目前只适用于pc端主流浏览器
     */
    import(/*webpackChunkName:"test",webpackPrefetch:true*/"./test").then(({ mul }) => {
        // eslint-disable-next-line
        console.log(mul(2, 3));
    }).catch(() => {
        // eslint-disable-next-line
        console.log("失败");
    });
}
// 注册ServiceWorker
// 处理兼容性问题
/**
 * 1. exlint不认识window、navigator全局变量
 *   解决：需要package.json中eslintConfig配置
 * "env":{
 *      "browser":true
 *  }
 * 2. sw必须运行在服务器上
 *  解决：1.nodejs
 *        2.npm i server -g
 *         通过命令server -s build，启动服务器,将build目录下所有资源作为静态资源暴露出去
 */
if("serviceWorker" in navigator){
    window.addEventListener("load",()=>{
        navigator.serviceWorker.register("/service-worker.js").then(()=>{
            // eslint-disable-next-line
            alert("sw注册成功");
        }).catch(()=>{
            // eslint-disable-next-line
            alert("sw注册失败");
        });
    })
}
