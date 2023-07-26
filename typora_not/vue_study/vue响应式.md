# vue响应式原理

> 响应式实现需要满足以下要求：
>
> 1. **当一个值被读取时进行追踪**
> 2. **当某个值改变时进行检测**
> 3. **重新运行代码读取原始值**

## 1. vue如何之道代码在执行

> Vue 通过一个*副作用 (effect)* 来跟踪当前正在运行的函数。副作用是一个函数的包裹器，在函数被调用之前就启动跟踪。Vue 知道哪个副作用在何时运行，并能在需要时再次执行它

```js
// 维持一个执行副作用的栈
const runningEffects = []

const createEffect = fn => {
  // 将传来的 fn 包裹在一个副作用函数中
  const effect = () => {
    runningEffects.push(effect)
    fn()
    runningEffects.pop()
  }

  // 立即自动执行副作用
  effect()
}
```

## 2. vue如何跟踪变化

> 利用proxy实现
> **Proxy 是一个对象，它包装了另一个对象，并允许你拦截对该对象的任何交互**

**例子**

```js
// 截获读取目标对象的动作
const dinner = {
  meal: 'tacos'
};
const handler = {
  // 获取
  get(target, property) {
    console.log('intercepted!');
    // 优化点2：跟踪一个property何时被读取 track处理器函数
    // tarck方法检查当前运行的是哪个副作用，并将其与 target 和 property 记录在一起
    track(target, property)
    // 返回目标对象
    // return target[property]
    // 优化点1：将该截获对象的所有方法都拦截
    // Reflect.get方法允许你从一个对象中取属性值。就如同属性访问器 语法，但却是通过函数调用来实现
    return Reflect.get(...arguments);
  }
  // 设置
  set(target, property,value, receiver){
    trigger(target, property);
    return Reflect.set(...arguments);
  }
}
const proxy = new Proxy(dinner, handler);
console.log(proxy.meal);
```

**答案**

1. **当一个值被读取时进行追踪**：proxy的get处理函数中track函数记录了该property和当前副作用
2. **当某个值改变时进行检测**：在proxy上调用set处理函数
3. **重新运行代码来读取原始值**：trigger函数查找哪些副作用依赖于改property并执行它们

## 3. 如何让渲染响应变化

> 一个组件的模板被编译成一个 [`render`](https://v3.cn.vuejs.org/guide/render-function.html) 函数。渲染函数创建 [VNodes](https://v3.cn.vuejs.org/guide/render-function.html#虚拟-dom-树)，描述该组件应该如何被渲染。它被包裹在一个副作用中，允许 Vue 在运行时跟踪被“触达”的 property。
>
> 一个 `render` 函数在概念上与一个 `computed` property 非常相似。Vue 并不确切地追踪依赖关系是如何被使用的，它只知道在函数运行的某个时间点上使用了这些依赖关系。如果这些 property 中的任何一个随后发生了变化，它将触发副作用再次运行，重新运行 `render` 函数以生成新的 VNodes。然后这些举动被用来对 DOM 进行必要的修改。

