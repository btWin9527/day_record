# router使用

## 1. Hash Router

**优点**

+ 兼容性好

**缺点**

+ 有#，不太美观
+ 前进后退功能比较繁琐(history比较容易实现前进，后退)

```js
// 封装hashRouter
var router = {
  routes: {},
  // 定义路由规则的方法
  route: function (path, callback) {
    this.routes[path] = callback
  },
  // 初始化方法
  init: function () {
    var that = this
    window.onhashchange = function () {
      // 当hash改变，需要得到新的hash，根据hash出发对应routes中的callback
      var hash = location.hash.replace('#', '')
      that.routes[hash] && that.routes[hash]()
    }
  }
}

// 定义路由规则
router.route('/', () => {
  console.log('this is home page')
})

router.init()
```

## 2. history Router

> h5提供新功能实现，history.pushState()

```js
var router = {
  // 存储路由对象
  routes: {},
  route(path, callback) {
    this.routes[path] = callback
  },
  // 用于触发指定的路由操作
  go(path) {
    // 更改url
    history.pushState({path: path,}, null, path)
    // 触发路由对应的回调函数
    this.routes[path] && this.routes[path]()
  },
  // 设置初始化方法，监测前进后退功能
  init() {
    var that = this
    // history模式，浏览器前进后后退时触发
    window.addEventListener('popstate', function (ev) {
      var path = e.state ? e.state.path: '/'
      that.routes[path] && that.routes[path]()
    })
  }
}

router.init()
```



