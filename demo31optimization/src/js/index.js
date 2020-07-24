// 通过$css找绝对路径，通过extensions省略.css，
import "$css/index";

import(/*webpackChunkName:'a'*/"./a.js").then(({add})=>{
    console.log(add(1,2));
});