# vite study

> 主要原理：浏览器原生 ESM（ES-Module）

## 1. 模块加载

> 解决代码模块按顺序加载

### 1.1 CommonJS规范

> 1. 统一的代码规范
> 2. 实现自动加载模块的加载器（loader）

```js
// demo例子
// module-a.js
var data = 'hello world';
function getData() {
    return data;
}
module.exports = {
    getData
}

// index.js
const {getData} = require('./module-a.js');
console.log(getData())
```

**存在的问题**

1. 模块加载器由 Node.js 提供，依赖了 Node.js 本身的功能实现，比如文件系统，如果 CommonJS 模块直接放到浏览器中是无法执行的，需要使用打包工具处理（如 browserify）
2. 约定以同步的方式进行模块加载，在浏览器端，会带来明显的性能问题。产生大量同步的模块请求，浏览器需要等待响应返回后才能继续解析模块。（`模块请求会早晨浏览器JS解析过程的阻塞，导致页面加载缓慢`）

### 1.2 AMD规范

> 异步模块定义规范（Asynchronous Module Definition）

```js
// demo例子
// main.js
define(['./print'], function (printModule){
    printModule.print('main');
})

// print.js
define(function (){
    return {
        print: function (ms) {
            console.log('print' + msg)
        }
    }
})
/**
 * 通过 define 去定义或加载一个模块，比如上面的 main 模块和print模块，
 * 如果模块需要导出一些成员需要通过在定义模块的函数中 return 出去(参考 print 模块)，
 * 如果当前模块依赖了一些其它的模块则可以通过 define 的第一个参数来声明依赖(参考main模块)，
 * 这样模块的代码执行之前浏览器会先加载依赖模块
 */
```
### 1.3 ES6 Module

> 现代浏览器中，如果html中包含`type="module"`属性的 script 标签，那么浏览器会按照 ES Module 规范来进行依赖加载和模块解析

```js
// main.js
import { methodA } from "./module-a.js";
methodA();

//module-a.js
const methodA = () => {
  console.log("a");
};

export { methodA };
```

**html中配置**
```html
<!-- html中引入文件 -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```
**package.json配置**

```json
{
  "type": "module"
}
```
