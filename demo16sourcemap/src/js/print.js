console.log("print.js被加载了"+new Date().toLocaleString());
function print(){
    const content="Hello Webpack~";
    console.log(content);
}
export default print;