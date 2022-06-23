# vueStudy

## 1. defineProperty

> vue2响应式原理实现

```js
// 1. 定义对象
var obj = {
  name: 'william',
  age: 18
}

// 2. 配置对象操作行为
Object.defineProperty(obj, 'gender', {
  value: '男', // 目标值
  writable: true, // 可写
  enumerable: true, // 可枚举
  configurable: true // 可配置
})

// 3. 劫持操作
// 如果使用get和set时 ，不能使用writable, enumerable, configurable

// 4. 定义变量接受结果值
var genderValue = '男'
Object.defineProperty(obj, 'gender', {
  get() {
    return genderValue
  },
  set(newValue) {
    genderValue = newValue
  }
})
```

## 2. vue2响应式原理

### 2.1 响应式数据模拟

> 实现数据变更，触发试图更新

```html

<div id="app">原始内容</div>
<script>
    // 数据变化，自动更新到试图
    let data = {
        msg: 'hello'
    }
    // 构建vue实例对象
    let vm = {}
    // 通过数据劫持的方式，将data的属性设置为getter/setter方式
    Object.defineProperty(vm, 'msg', {
        enumerable: true,
        configurable: true,
        get() {
            console.log('访问属性')
            return data.msg
        },
        set(newVal) {
            data.msg = newVal
            // 更新试图数据
            document.querySelector('#app').textContent = data.msg
        }
    })
</script>

```

**改进**

1. 多个属性监听处理
2. 无法监听数组变化
3. 无法处理属性也是对象的情况

```html

<div id="app">原始内容</div>
<script>
    // 数据变化，自动更新到试图
    let data = {
        msg: 'hello',
        msg2: 'world',
        // 无法监听到arr[1], arr.push(1)修改,更新到试图上
        arr: [1, 2, 3],
        obj: {
            a: 1
        }
    }
    // 构建vue实例对象
    let vm = {}

    const createReactive = (function () {
        // 添加数组方法支持
        const arrMethodName = ['push', 'pop', 'shift', 'unshift', 'splice',
            'sort', 'reverse']
        // 存储处理结果的对象，替换掉数组实例的原型指针
        const customProto = {}
        // 避免数组实例无法使用其它api
        customProto.__proto__ = Array.prototype

        arrMethodName.forEach(method => {
            customProto[method] = function () {
                // 进行其它自定义功能设置
                // 保留原始功能可以使用, this指数组实例
                const result = Array.prototype[method].apply(this, arguments)
                document.querySelector('#app').textContent = this
                return result
            }
        })
        // 劫持操作，用于递归
        // 遍历data所有属性
        return function (data, vm) {
            Object.keys(data).forEach(key => {
                if (Array.isArray(data[key])) {
                    // 修改当前数组实例的__proto__改为customProto
                    data[key].__proto__ = customProto
                } else if (typeof data[key] === 'object' && data[key] !== null) {
                    // 检测是否为对象,对象递归
                    vm[key] = {}
                    createReactive(data[key], vm[key])
                    return
                }

                // 通过数据劫持的方式，将data的属性设置为getter/setter方式
                Object.defineProperty(vm, key, {
                    enumerable: true,
                    configurable: true,
                    get() {
                        console.log('访问属性')
                        return data[key]
                    },
                    set(newVal) {
                        data[key] = newVal
                        // 更新试图数据
                        document.querySelector('#app').textContent = data[key]
                    }
                })
            })
        }
    })()

    createReactive(data, vm)
</script>

```

## 3. vue3响应式原理

### 3.1 Proxy代理

> Proxy直接代理目标对象，就可以实现监测内部对象或者数组类型的操作

```js
const data = {
  msg: '内容',
  arr: [1, 2, 3],
  obj: {
    name: 'william',
    age: 18
  }
}

const p = new Proxy(data, {
  get(target, property, receiver) {
    console.log(target, property, receiver)
    // 返回当前访问属性值
    return target[property]
  },
  set(target, property, value, receiver) {
    console.log(target, property, value, receiver)
    // 使用新值覆盖旧值
    target[property] = value
  }
})
```

### 3.2 vue3响应式原理实现

```html

<body>
<div id="app">原始内容</div>
</body>
<script>
    const data = {
        msg: 'hello',
        content: 'world',
        arr: [1, 2, 3],
        obj: {
            name: 'william',
            age: 18
        }
    }

    const vm = new Proxy(data, {
        get(target, key) {
            return target[key]
        },
        set(target, key, newValue) {
            target[key] = newValue
            document.querySelector('#app').textContent = target[key]
        }
    })
</script>
```

## 4 vue中使用的设计模式

### 4.1 观察者模式

> 指在对象间定义一个一对多（被观察者与多个观察者）的关联，当一个对象改变了状态，
> 所有其它相关的对象会被通知并自动刷新

**概念**

+ 观察者 Observer
+ 观察目标 Subject

```js
/**
 * 观察目标 Subject
 * 1. 存储多个观察者
 * 2. 添加观察者操作
 * 3. 通知观察者操作
 */
class Subject {
  constructor() {
    this.observers = []
  }

  // 添加观察者
  addObserver(observer) {
    // 判断是否为观察者
    if (observer && observer instanceof Observer) {
      this.observers.push(observer)
    }
  }

  // 通知观察者
  notify() {
    this.observers.forEach(item => item.update())
  }
}

/**
 * 观察者
 * 1. 接收观察目标变化通知
 */
class Observer {
  update() {
    console.log('update')
  }
}

// 实例化观察目标和观察者
const subject = new Subject()
const obj1 = new Observer()
const obj2 = new Observer()
// 添加观察者
subject.addObserver(obj1)
subject.addObserver(obj2)
// 观察目标发生变化，通知观察者
subject.notify()
```

### 4.2 发布-订阅模式

> 为观察者模式解耦

**特点**

+ 在发布者与订阅者之间添加消息中心，所有的消息通过消息中心管理，发布者与订阅者不直接联系

**概念**

+ 消息中心 Dep
+ 订阅者 Subscriber
+ 发布者 Publisher

## 5. vue响应式原理实现

**目录**

```text
目录结构
+ js
    + Vue.js
    + Observer.js
    + Dep.js
    + Watcher.js
+ index.html
```

**index.html**

```html
<!--index.html-->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div id="app">
    {{msg1}}
    <p>{{msg1}}</p>
</div>
<script src="./js/Dep.js"></script>
<script src="./js/Watcher.js"></script>
<script src="./js/Observer.js"></script>
<script src="./js/Compiler.js"></script>
<script src="./js/Vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            msg1: '内容1',
            msg2: '内容2',
            obj: {
                a: 1,
                b: 2
            }
        }
    })


</script>
</body>
</html>
```

**Vue.js**
> Vue类

```js
// Vue.js
class Vue {
  constructor(options) {
    // 1. 存储属性
    this.$options = options || {}
    this.$data = options.data || {}
    // 判断el值的类型，并进行相应的处理
    const {el} = options
    this.$el = typeof el === 'string' ? document.querySelector(el) : el
    // 2. 将data注入Vue实例中
    _proxyData(this, this.$data)
    // *3. 创建Observer实例，监视data的属性变化
    new Observer(this.$data)
    // *4.调用Compiler
    new Compiler(this)
  }

}

// 将data的属性注入vue实例
function _proxyData(target, data) {
  Object.keys(data).forEach(key => {
    Object.defineProperty(target, key, {
      enumerable: true,
      configurable: true,
      get() {
        return data[key]
      },
      set(newVal) {
        data[key] = newVal
      }
    })
  })
}
```

**Observer.js**

+ 通过数据劫持方式，监视data中的属性变化，变化时通知消息中心
+ 需要考虑data的属性可能会对象，也要转换成响应式数据

```js
// Observer.js
class Observer {
  // 接收传入的对象，将这个对象的属性转换为Getter/Setter
  constructor(data) {
    this.data = data
    // 遍历数据
    this.walk(data)
  }

  // 封装用于数据遍历的方法
  walk(data) {
    // 将遍历后的属性转换为Getter、Setter
    Object.keys(data).forEach(key => this.convert(key, data[key]))
  }

  // 封装用于将对象转换为响应式数据的方法
  convert(key, value) {
    defineReactive(this.data, key, value)
  }
}

// 用于为对象定义一个响应式的属性
function defineReactive(data, key, value) {
  // 创建消息中心
  const dep = new Dep()

  // 检测是否为对象，如果是，创建一个新的Observer类
  observer(value)

  // 进行数据劫持
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('获取属性')
      // *在触发Getter时添加订阅者
      Dep.target && dep.addSub(Dep.target)
      return value
    },
    set(newValue) {
      console.log('设置属性')
      if (newValue === value) return
      value = newValue
      observer(value)
      // * 数据变化，通知消息中心
      dep.notify()
    }
  })
}

function observer(value) {
  if (typeof value === 'object' && value !== null) {
    new Observer(value)
  }
}
```

**Dep类**

+ 用于收集与管理订阅者与发布者之间的以来
+ 功能
  + *为每隔数据收集对应的以来，存储依赖
  + 添加并存储订阅者
  + 数据变化时，通知所有观察者

```js
class Dep {
  constructor() {
    // 存储订阅者
    this.subs = []
  }

  // 添加订阅者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }

  // 通知订阅者的方法
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

```

**Watcher类**

+ 实例化Watch时，往dep对象中添加自己
+ 当数据变化触发dep，dep通知所有对应的Watcher实现视图更新

```js
// Watcher.js
class Watcher {
  constructor(vm, key, cb) {
    // 当前Vue实例
    this.vm = vm
    // 订阅的属性名
    this.key = key
    // 数据变化后，要执行的回调
    this.cb = cb
    // 触发Getter前，将当前订阅者实例存储给Dep类
    Dep.target = this
    // 记录属性更改之前的值，用于进行更新状态检测（导致了属性Getter的触发）
    this.oldValue = vm[key]
    // 操作完毕后清除taget,用于存储下一个Wather实例
    Dep.target = null
  }

  // 
  update() {
    const newValue = this.vm[this.key]
    if (newValue === this.oldValue) return
    // 数据变化，调用更新后的回调
    this.cb(newValue)
  }
}
```

**Compiler类**

+ 进行编译模版，并解析内部指令与插值表达式
+ 进行页面的首次渲染
+ 数据变化后，重新渲染视图

```js
// Compiler.js
class Compiler {
  constructor(vm) {
    this.vm = vm
    this.el = vm.$el

    // 初始化模板编译方法
    this.compile(this.el)
  }

  // 基础模板方法
  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 检测节点类型（文本节点、元素节点）
      if (isTextNode(node)) {
        // 编译文本节点内容
        this.compileText(node)
      } else if (isElementNode(node)) {
        // 编译元素节点内容
        this.compileElement(node)
      }
      // 检测当前节点是否存在子节点
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  // 封装文本节点编译方法
  compileText(node) {
    const reg = /\{\{(.+?)\}\}/g
    // 去除内容中不必要的空格与换行
    const value = node.textContent.replace(/\s/g, '')
    // 声明数据存储多段文本
    const tokens = []
    // 记录已经操作过的位置的索引
    let lastIndex = 0
    // 记录当前提取内容的初始索引
    let index
    let result
    while (result = reg.exec(value)) {
      // 本次提取内容的初始索引
      index = result.index
      // 处理普通文本
      if (index > lastIndex) {
        // 将中间部分的内容存储到 tokens 中
        tokens.push(value.slice(lastIndex, index))
      }
      // 处理插值表达式内容(去除空格的操作可省略)
      const key = result[1].trim()
      // 根据 key 获取对应属性值，存储到 tokens
      tokens.push(this.vm[key])
      // 更新 lastIndex
      lastIndex = index + result[0].length
      // 创建订阅者 Watcher 实时订阅数据变化
      const pos = tokens.length - 1
      new Watcher(this.vm, key, newValue => {
        // 数据变化，修改 tokens 中的对应数据
        tokens[pos] = newValue
        node.textContent = tokens.join('')
      })
    }
    if (tokens.length) {
      // 页面初始渲染
      node.textContent = tokens.join('')
    }
  }

  // 封装元素节点处理方法
  compileElement(node) {
    // 获取属性节点
    Array.from(node.attributes).forEach(attr => {
      // 保存属性名称，并检测属性的功能
      let attrName = attr.name
      if (!isDirective(attrName)) return
      // 获取指令的具体名称
      attrName = attrName.slice(2)
      // 获取指令的值，代表响应式数据的名称
      let key = attr.value
      // 封装 update 方法，用于进行不同指令的功能分配
      this.update(node, key, attrName)
    })
  }

  // 用于进行指令分配的方法
  update(node, key, attrName) {
    // 名称处理
    let updateFn = this[attrName + 'Updater']
    // 检测并调用
    updateFn && updateFn.call(this, node, key, this.vm[key])
  }

  // v-text 处理
  textUpdater(node, key, value) {
    // 给元素设置内容
    node.textContent = value
    // 订阅数据变化
    new Watcher(this.vm, key, newValue => {
      node.textContent = newValue
    })
  }

  // v-model 处理
  modelUpdater(node, key, value) {
    // 给元素设置数据
    node.value = value
    // 订阅数据变化
    new Watcher(this.vm, key, newValue => {
      node.value = newValue
    })
    // 监听 input 事件，实现双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }
}

// 判断节点是否为元素节点
function isElementNode(node) {
  return node.nodeType === 1
}

// 判断节点是否为文本节点
function isTextNode(node) {
  return node.nodeType === 3
}

// 判断属性名是否为指令
function isDirective(attrName) {
  return attrName.startsWith('v-')
}
```
