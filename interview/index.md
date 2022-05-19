## 1. 字节2021面试题

### css

#### 1 元素水平，垂直局中

```html

<style>
    html, body {
        width: 100%;
        height: 100%;
    }

    .con {
        width: 200px;
        height: 200px;
        background-color: red;
        /* 2. */
        margin: auto;
    }

    .body {
        /* 1. */
        display: flex;
    }
</style>
<html>
<body>
<div class="con">
    <h1>test</h1>
</div>
</body>
</html>
```

#### 2 padding和margin的区别

```text
作用对象不同
    padding作用自身
    margin作用于外部
```

#### 3 vw和百分比区别

```text
vw相对于视口宽度
%相对于父元素,有继承关系
```

### js

#### 深拷贝

```js
function deepClone(source) {
  const result = Array.isArray(source) ? [] : {}
  Reflect.ownKeys(source).forEach((keys) => {
    result[keys] = typeof source[keys] === 'object' ?
      deepClone(source[keys])
      : source[keys]
  })
  return result
}
```

#### 手写promise

> 1. 状态变更
> 2. .then操作
> 3. 异步调用

```js
// 1. 基本结果
function myPromise(excutor) {
  let self = this
  self.status = 'pending' // 状态
  self.value = null // 成功之后，返回数据
  self.reason = null // 失败的原因

  // 7. 解决异步问题 => 暂存区
  self.onFulfilledCallbacks = []
  self.onRejectedCallbacks = []

  // 返回成功的结果
  function resolve(value) {
    // 5.1 状态管理
    if (self.status === 'pending') {
      self.status = 'fulfilled'
      self.value = value
      // 9. 状态改变 => 依次取出
      self.onFulfilledCallbacks.forEach(item => item(value))
    }
  }

  // 返回失败的原因
  function reject(reason) {
    // 5.2
    if (self.status === 'pending') {
      self.status = 'reject'
      self.reason = reason
      // 9. 状态改变 => 依次取出
      self.onRejectedCallbacks.forEach(item => item(reason))
    }
  }

  // 4. 立即执行
  try {
    excutor(resolve, reject)
  } catch (e) {
    reject(e)
  }

}

// 2. then()
myPromise.prototype.then = function (onFulfilled, onRejected) {
  // 6. 确保传入函数
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled :
    function (data) {
      resolve(data)
    }
  onRejected = typeof onFulfilled === 'function' ? onFulfilled :
    function (err) {
      throw err
    }
  let self = this
  // 8. 暂存回调函数
  if (self.status === 'pending') {
    self.onFulfilledCallbacks.push(onFulfilled)
    self.onRejectedCallbacks.push(onRejected)
  }
}

// 3. 调用
let demo = new myPromise((resolve, reject) => {
  console.log(111)
  setTimeout(() => {
    resolve(222)
  }, 500)
})

demo.then((data) => {
  console.log(data, 'data')
})


```

### vue

1.vue渲染机制
A.将真实dom转化为虚拟dom
B.更新时候进行对比

2.虚拟dom如何提升vue渲染效率
A.局部更新
B.将直接操作dom的地方拿到两个js对象中进行比较

#### patch方法

```js
// 1. 初始化 patch(container, vnode)
function createElement(vnode) {
  let tag = vnode.tag // 目标元素
  let attrs = vnode.attrs || {} // 属性
  let children = vnode.children || [] // 字节点

  if (!tag) {
    return null
  }
  // 1. 创建对应的dom
  let elem = document.createElement(tag)
  // 给dom添加属性
  let attrName
  for (attrName in attrs) {
    if (attrs.hasOwnProperty(attrName)) {
      // class
      elem.setAttribute(attrName, attrs[attrName])
    }
  }
  // 3. 将自元素添加到目标元素上
  children.forEach((childNode) => {
    elem.appendChild(createElement(childNode))
  })
  return elem
}


// 2. 更新 update(vnode, newNode)
function updateChildren(vnode, newVnode) {
  let children = vnode.children || [] // 现有节点
  let newChildren = newVnode || [] // 新节点
  children.forEach((childrenVnode, index) => {
    // 循环的每一项
    let newChildrenVnode = newChildren[index]
    if (childrenVnode.tag === newChildrenVnode.tag) {
      updateChildren(childrenVnode, newChildrenVnode)
    } else {
      replaceNode(childrenVnode, newChildrenVnode)
    }
  })
}
```

#### render优化多个v-if

```vue
<!-- 按条件渲染的组件-->
<script>
export default {
  props: {
    // 按钮类型
    type: {
      type: String,
      default: 'normal'
    },
    // 按钮的text
    text: {
      type: String,
      default: 'normal'
    }
  },
  render(h) {
    // h表示js原生的creatElement
    return h('button', {
      class: {
        btn: true,
        'btn-success': this.type === 'success',
        'btn-danger': this.type === 'danger',
        'normal': !this.type
      },
      // dom属性
      domProps: {
        innerText: this.text || '默认按钮'
      },
      // v-on
      on: {}
    })
  }
}
</script>
```

#### router.js动态封装

```js
// index.routes.js
export default {
  path: '/index',
  name: 'index',
  component: () => import('../views/index.vue'),
  // 子路由
  children: []
}
// index.js
const routerList = []


// 导入其它路由模块
function importAll(r) {
  r.keys().forEach((key) => routerList.push(r(key).default))
}

// require.context()
// 1. 路径,2. 是否匹配子级目录，3. 匹配规则
importAll(require.context('./', false, /\.routes.\.js/))
const routes = [
  ...routerList
]
``` 

#### 权限控制

```js
// 设置全局指令
Vue.directive('display-key', {
  // 元素插入
  inserted(el, binding) {
    let displayKey = binding.value;
    if (displayKey) {
      // checkArray是一个判断是否有权限的方法
      let hasPermisson = checkArray(displayKey)
      if (!hasPermisson) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw(new Error('...'))
    }
  }
})

// 路由设置meta属性，在router.beforeEach路由守卫处理
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token')
  if (to.meta.require) {
    if (token) {
      // 允许进入
      next()
    } else {
      // 跳转登陆
    }
  } else {
    next()
  }
})
```

## 2. 发布订阅模式

```js
let Event = (function () {
  let list = {},
    listen,
    trigger,
    remove;

  listen = function (key, fn) {
    (this.list[key] || (this.list[key] = [])).push(fn)
  }
  trigger = function () {
    // 类数组转数组
    let key = Array.prototype.shift.call(arguments),
      fns = this.list[key]; // 取出该消息对应回调函数

    if (!fns || fns.length === 0) {
      return
    }
    for (let i = 0; fn; fn = fns[i++]) {
      fn.apply(this, arguments) // 发布消息时的参数
    }
  }
  remove = function (key, fn) {
    let fns = list[key]
    if (!fns) {
      return false
    }
    if (!fn) {
      fn && (fns.length = 0)
    } else {
      for (let i = fns.length - 1; i >= 0; i--) {
        let _fn = fns[i]
        _fn === fn && (fn.splice(i, 1))
      }
    }
  }

  return {
    listen,
    trigger,
    remove
  }
})()


```

## 3. 性能优化

1. 页面加载性能
2. 动画与操作性能
3. 内存占用
4. 电量消耗

### 3.1 从浏览器输入url发生的事情

> https://www.baidu.com
> url => 统一资源定位符
> https: 传输协议（http与tcp之间加入了一层TSL或者SSL的安全层）
> www: 服务器
> baidu.com 域名

1. 第一次访问 (再次访问，将域名ip存在本读，读取浏览器缓存)
2. 解析url
3. DNS域名匹配真是IP地址
4. 建立连接（ping baidu.com）TCP三次握手
5. 拿到数据，渲染页面
6. 四次挥手断开连接

### 3.2 平时做性能优化的地方

1. 加载
1. 减少http请求(文件合并)
2. 减小文件大小（资源，图片，代码压缩）
3. CDN(第三方库,大文件，大图)
4. SSR服务端渲染，预渲染
5. 懒加载
6. 分包
2. 性能
1. 减少dom操作，避免回流，文档碎片优化dom操作

### 3.3 懒加载

```html

<body>
<img src="./test.gif" data-src="./img/time.jpg" alt="">
<img src="./test.gif" data-src="./img/time2.jpg" alt="">
<img src="./test.gif" data-src="./img/time3.jpg" alt="">
</body>
<script>
    let num = document.getElementsByTagName('img').length;
    let img = document.getElementsByTagName('img')
    let n = 0

    lazyload();
    window.scroll = lazyload;

    function lazyload() {
        let viewHeight = document.documentElement.clientHeight
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        for (let i = n; i < num; i++) {
            // 在视口区域显示
            if (img[i].offsetHeight < scrollTop + viewHeight) {
                // 如果当前图片显示为预览图，将其替换为真实图片
                if (img[i].getAttribute('src') === './test.gif') {
                    img[i].src = img[i].getAttribute('data-src')
                }
                // 避免滚动时图片重复加载
                n = i + 1;
            }
        }
    }
</script>

```