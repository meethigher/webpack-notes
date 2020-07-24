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
        console.log(mul(2, 3));
    }).catch(() => {
        console.log("失败");
    });
}
