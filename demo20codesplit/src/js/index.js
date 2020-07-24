import $ from "jquery";
function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));
// eslint-disable-next-line
console.log($);

/**
 * 通过js代码，让某个文件被单独打包成一个chunk
 * import动态导入语法：能将某个文件单独打包
 * 
 * webpackChunkName:'xxx'设置打包之后的名字，如果不设置，默认是以chunk的id值来命名
 */
import(/* webpackChunkName:'js动态导入' */"./test")
  .then(({ mul, count }) => {
    //文件加载成功
    // eslint-disable-next-line
    console.log(mul(2, 3));
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log("文件加载失败");
  });
