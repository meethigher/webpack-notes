
import sub from "./sub";
console.log("indexjs文件加载")

import("./add").then(({default:add})=>{
    console.log(add(1,2));
});
console.log(sub(2,1));