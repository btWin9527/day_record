# js进阶知识点

## 1. 继承

> 重点划分：

+ 

## 2. 手写call、apply、bind

> 重点划分

+ 

## 3. 防抖和节流

**防抖**

> 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

```html
<!-- 在执行setTimeout函数之前先将timer用clearTimeout清除，取消延迟代码块，确保只执行一次 -->
<div>防抖后的input: <input id="debounce" /></div>
<script>
//模拟一段ajax请求
function ajax(content) {
  console.log('ajax request ' + content)
}

function debounce(fun, delay) {
    return function (args) {
        let that = this
        let _args = args
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
            fun.call(that, _args)
        }, delay)
    }
}
    
let inputb = document.getElementById('debounce')

let debounceAjax = debounce(ajax, 500)

inputb.addEventListener('keyup', function (e) {
        debounceAjax(e.target.value)
    })
</script> 
```

**节流**

> 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

```html
<!--
	主要思路利用时间戳判断，每次调用判断和上一次调用的时间差异确定是否需要调用。
-->
<div>节流后的input: <input id="throttle" /></div>
<script>
  function throttle(fun, delay) {
        let last, deferTimer
        return function (args) {
            let that = this
            let _args = arguments
            let now = +new Date()
            if (last && now < last + delay) {
                clearTimeout(deferTimer)
                deferTimer = setTimeout(function () {
                    last = now
                    fun.apply(that, _args)
                }, delay)
            }else {
                last = now
                fun.apply(that,_args)
            }
        }
    }

    let throttleAjax = throttle(ajax, 1000)

    let inputc = document.getElementById('throttle')
    inputc.addEventListener('keyup', function(e) {
        throttleAjax(e.target.value)
    })
</script> 
```

**应用场景**

​	**防抖(debounce)**

+ search搜索联想，用户在不断输入值时，用防抖来节约请求资源。（用户一直输入会有新触发，停止的时候才会延迟触发）

+ window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

+ 频繁操作点赞和取消点赞，因此需要获取最后一次操作结果并发送给服务器

  **节流(throttle)**

+ 鼠标不断点击触发，mousedown(单位时间内固定只触发一次)
+ 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断

## 4. 排序

> 重点划分

```js
/* 排序通用方法 */

// 检测是否为数组
function checkArray(array) {
  // 不支持isArray Api 使用 array && typeof array === 'object' && array.length
  return Array.isArray(array)
}

// 交换方法
function swap(array, left, right) {
  let rightValue = array[right];
  array[right] = array[left];
  array[left] = rightValue;
}

/* 冒泡排序 */
function bubble(array) {
  let isArray = checkArray(array);
  if (!isArray) return;
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) swap(array, j, j + 1);
    }
  }
  return array;
}

/* 插入排序
原理:第一个元素默认是已排序元素，取出下一个元素和当前元素比较，如果当前元素大就交换位置。那么此时第一个元素就是当前的最小数，所以下次取出操作从第三个元素开始，向前对比，重复之前的操作
*/
function insertion(array) {
  if (!checkArray(array)) return;
  for (let i = 0; i < array.length; i++) {
    for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--) {
      swap(array, j, j + 1);
    }
  }
  return array;
}

/* 选择排序 
原理:遍历数组，设置最小值的索引为 0，如果取出的值比当前最小值小，就替换最小值索引，遍历完成后，将第一个元素和最小值索引上的值交换。如上操作后，第一个元素就是数组中的最小值，下次遍历就可以从索引 1 开始重复上述操作
*/
function selection(array) {
  if (!checkArray(array)) return;
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      minIndex = array[j] < array[minIndex] ? j : minIndex;
    }
    swap(array, i, minIndex);
  }
}

```

> **冒泡排序原理**：从第一个元素开始，把当前元素和下一个索引元素进行比较。如果当前元素大，则交换位置，重复比较到最后一个元素，那么此时最后一个元素就是该数组中最大的数。下一轮重复以上操作，但此时最后一个已经是最大数，所以不需要比较最后，只需比较到length - 2的位置

![avatar](../images/interview/algorithm/bubble_sort.gif)



## 5. 数组去重

```js
// 1. es6 Set
// 这种去重的方法代码最少。这种方法还无法去掉“{}”空对象
function unique (arr) {
  return Array.from(new Set(arr)) 
  // return [...new Set(arr)]
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
 //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]

// 2. for循环嵌套
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array .indexOf(arr[i]) === -1) {
            array .push(arr[i])
        }
    }
    return array;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
   // [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {…}, {…}]  //NaN、{}没有去重

// 3. 对象属性不同去重
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var arrry= [];
     var  obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            arrry.push(arr[i])
            obj[arr[i]] = 1
        } else {
            obj[arr[i]]++
        }
    }
    return arrry;
}
    var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
        console.log(unique(arr))
//[1, "true", 15, false, undefined, null, NaN, 0, "a", {…}]    //两个true直接去掉了，NaN和{}去重

// 4. includes
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array =[];
    for(var i = 0; i < arr.length; i++) {
            if( !array.includes( arr[i]) ) {//includes 检测数组是否有某个值
                    array.push(arr[i]);
              }
    }
    return array
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
    console.log(unique(arr))
    //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]     //{}没有去重

// 5. filter去重
function unique(arr) {
  return arr.filter(function(item, index, arr) {
    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item, 0) === index;
  });
}
    var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
        console.log(unique(arr))
//[1, "true", true, 15, false, undefined, null, "NaN", 0, "a", {…}, {…}]

// 6. reduce去重
function unique(arr){
    // 之前累加得到的数组中是否包含当前数组元素，包含则使用上一次累加结果为当前累加结构，不包含则返回之前累加值和当前数组元素的新数组
    return arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cur],[]);
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr));
// [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]
```





## 6.  promise，promise和async await的区别

**promise**

```text
Promise过程：
1. 等待中（pending）
2. 完成了 （resolved）
3. 拒绝了（rejected）

【特点】这个承诺一旦从等待状态变成为其他状态就永远不能更改状态了，也就是说一旦状态变为 resolved 后，就不能再次改变
```

**async和await**

```text
优点：
1. 使用async函数可以让代码简洁很多，不需要像Promise一样需要些then，不需要写匿名函数处理Promise的resolve值，也不需要定义多余的data变量，还避免了嵌套代码
2. Async/Await 让 try/catch 可以同时处理同步和异步错误
3. 多个异步操作方便使用和传值
```

**错误处理比较**

```js
// promise
const makeRequest = () => {
        try {
            getJSON().then(result => {
                // JSON.parse可能会出错
                const data = JSON.parse(result)
                console.log(data)
            })
            // 取消注释，处理异步代码的错误
            // .catch((err) => {
            //   console.log(err)
            // })
        } catch (err) {
            console.log(err)
        }
    }

// async/await  catch能处理JSON.parse错误
const makeRequest = async () => {
        try {
            // this parse may fail
            const data = JSON.parse(await getJSON())
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
```

## 7. 事件循环相关考点

> 涉及题目： 进程与线程区别？JS 单线程带来的好处？
>
> 进程：CPU在运行指令及加载和保存上下文所需的时间
>
> 线程：描述了指向一段指令所需要的时间
>
> 例子：打开一个tab (创建了一个进程，包含渲染线程、JS 引擎线程、HTTP 请求线程等等)

```js
/*
* 涉及题目：什么是执行栈
* 执行栈认为是一个存储函数调用的栈结构
* */
console.log('script start') // 1

async function async1() {
  await async2() // 调用2
  console.log('async1 end') // 5
}

async function async2() {
  console.log('async2 end') // 2
}

async1(); // 调用1

setTimeout(function () {
  console.log('setTimeout') // 8
}, 0)

new Promise((resolve) => {
  console.log('Promise') // 3
  resolve()
})
  .then(function () {
    console.log('promise1') // 6
  })
  .then(function () {
    console.log('promise2') // 7
  })

console.log('script end') // 4
/*
* Event Loop执行顺序：
* 1. 首先执行同步代码，这属于宏任务
* 2. 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
* 3. 指向所有微任务
* 4. 当执行完所有微任务后，如有必要会渲染页面
* 5. 然后开始下一轮Event Loop, 执行红任务中的异步代码，也就是setTimeout中的回调函数
*
* */

/*
* 微任务：
* process.nextTick,promise,MutationObserver
* 宏任务：
* script, setTimeout, setInterval, setImmediate, I/O, UI rendering
*
* */
```

