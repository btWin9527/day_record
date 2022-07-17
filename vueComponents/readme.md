# vue组件学习

## 组件命名规则

> 组件引入使用时，使用kebab-case进行设置

1. kebab-case: 'my-component'
2. PascalCase: 'MyComponent'

## props命名规则

+ 建议prop命名使用camelCase，父组件绑定时使用kebab-case

## 单向数据流

> 子组件不能修改父组件传过来的数据（props中接到的数据），如需要进行二次处理，需要在data中进行接收

+ 如果prop中有对象或数组引用类型，修改内部属性，是会影响到父组件对应数据【且不会被工具监测到,需要拷贝处理】
+ props中，无法使用this访问到vue实例，此处的this为window

## 非Props属性

> 当父组件给子组件设置属性，若子组件未使用props接收，会直接绑定到子组件的data上，若存在则会替换子组件属性

## 子组件给父组件传递数据

+ 子组件数据变化，通过$emit()触发自定义事件

```js
// 子组件
const comp = {
  methods: {
    countIns1() {
      this.count++
      this.$emit('count-change', 2)
    }
    countIns1() {
      this.count += 5
      this.$emit('count-change', 5)
    }
  }
}

// 父组件
// @count-change="totalCount"
const parentComp = {
  methods: {
    totalCount(value) {
      this.totalCount += value
    }
  }
}
```

## 组件v-model双向绑定

> v-model用于组件时，需要通过props与自定义事件实现

```vue
<!-- 父组件 -->
<!--<template>
  <p>输入的内容：{{iptValue}}</p>
  <com-inp v-model="inpValue"></com-inp>
</template>
<script>
export default {
  components: {
    comInp
  },
  data(){
    return {
      inpValue: ''
    }
  }
}
</script>-->
<!-- 子组件 -->
<template>
  <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
  >
</template>

<script>
export default {
  props: ['value'],
}
</script>
```

## 非父子组件传值

### 兄弟组件传值

+ 使用父组件进行数据中转
+ EventBus (独立事件中心，管理组件间的传值操作,通过一个新的Vue实例进行事件注册/调用，实现数据传递)
  + 发送数据的组件触发bus事件，接收的组件给bus注册对应事件

```js
// EveentBus.js
var bus = new Vue;
// index.html中js部分
// 商品组件
Vue.component('ProductItem', {
  tempalte:
    `<div>
      <button @click="handleIncrease">增加</button>
    </div>`,
  data() {
    return {
      count: 0
    }
  },
  methods: {
    handleIncrease() {
      this.count++;
      // 事件注册
      this.$emit('countChange', this.count)
    }
  }
})

// 其它组件
Vue.component('ProductShow', {
  tempalte:
    `<div>
      <span>{{count}}</span>
    </div>`,
  data() {
    return {
      count: 0
    }
  },
  created() {
    // 绑定事件，回调中获取数据
    bus.$on('countChange', (value) => {
      this.count = value
    })
  }
})


// 根实例
new Vue({
  el: '#app',
  data: {}
})
```

## 其它通信方式

```js
// 了解
// $root 用于访问组件树的根实例，设置简单的Vue应用可以用该方式进行组件传值
// $refs 获取设置了ref属性的html标签或子组件

```

## 组件插槽

**单个插槽**

+ 需要注意模版内容渲染位置
+ 父组件插槽填充内容，只能使用父组件的数据
+ 可以设置默认值

```js
// 父组件
/*
* <com-a>testInfo</com-a>
* 
* */

// 子组件
Vue.compoennt('com-a', {
  template:
    `
  <div>
    <slot>默认文本内容</slot>
  </div>
  `
})
```

**具名插槽**

```vue
<!-- 子组件 -->
<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
  </div>
</template>

<!-- 父组件 -->
<template>
  <com-a>
    <!--    <template #header>-->
    <template v-slot:header>
      <h1>组件头部内容</h1>
    </template>
  </com-a>
</template>
```

**作用域插槽**

> 用于让插槽使用子组件数据

```vue
<!-- 子组件 -->
<template>
  <div>
    <header>
      <slot :num="123" :value="value"></slot>
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 'value info'
    }
  }
}
</script>
<!-- 父组件 -->
<template>
  <com-a>
    <!-- dataObj表示接收到的所有数据，是一个对象 -->
    <template v-slot:default="dataObj">
      <h1>{{dataObj.value}}</h1>
      <p>{{dataObj.num}}</p>
    </template>
  </com-a>
</template>
```

+ 如果只存在默认插槽，同时又需要接收数据，可以简写如下

```vue
<!-- 父组件 -->
<div id="app">
<!-- 这里dataObj支持解构赋值 {dataObj} -->
<com-a v-slot:default="dataObj">
  {{dataObj.value}}
</com-a>
</div>
```

## 内置组件

### 动态组件

> 适合多个组件频繁切换的处理 (<component>用于将一个元组件渲染为动态组件，已is属性决定渲染哪个组件)

```vue
<!-- 父组件 -->
<template>
  <div id="app">
    <button
        v-fo="item in titles"
        :key="item"
        @click="displayComp = item"
    >
      {{item}}
    </button>
    <!--  
      is属性会在每次切换组件时，vue会创建一个新的组件实例
      -->
    <component :is="displayComp"></component>
  </div>
</template>
<script>
/* 子组件有ComA,ComB,ComC */
var ComA = {}
var ComB = {}
var ComC = {}
export default {
  data() {
    return {
      displayComp: '',
      titles: ['ComA', 'ComB', 'ComC']
    }
  },

}
</script>

```

### keep-alive组件

> 主要是用于保留组件状态或避免组件重复渲染

```vue
<!-- 父组件 -->
<template>
  <div id="app">
    <button
        v-fo="item in titles"
        :key="item"
        @click="displayComp = item"
    >
      {{item}}
    </button>
    <!--  
    默认缓存keep-alive包裹内部的所有组件，
    可以通过include或exclude进行控制具体缓存哪些组件,
    参数为字符串｜数组｜正则表达式
    max: 设置最大缓存个数(会保留最近的n个组件状态)
      -->
    <keep-alive :include="/Com[AB]/">
      <component :is="displayComp"></component>
    </keep-alive>
  </div>
</template>
<script>
/* 子组件有ComA表单,ComB表单,ComC表单，需要保留该组件的状态 */
var ComA = {}
var ComB = {}
var ComC = {}
export default {
  data() {
    return {
      displayComp: '',
      titles: ['ComA', 'ComB', 'ComC']
    }
  },

}
</script>
```

### 过渡组件

> 用于给元素和组件添加进入/离开过渡

+ 条件渲染（v-if）
+ 条件展示(v-show)
+ 动态组件
+ 组件根节点

```vue

<template>
  <!-- 
   transition组件提供了6个class，设置过渡的具体效果
   进入的类名：
   v-enter 开始
   v-enter-to
   v-enter-active 进入激活
   
   v-leave
   v-leave-to 离开
   v-leave-active 离开激活
   -->

</template>

<style>
/* 过渡执行状态 */
.v-enter-active, .v-leave-active {
  transition: all .5s;
}

/* 入场初始状态和离场结束状态 */
.v-enter, .v-leave-to {
  opacity: 0;
}
</style>
```

**transition组件的相关属性**

```vue

<template>
  <!-- 
  name 用于给多个元素、组件设置不同的过渡效果
  appear 让组件在初始渲染时实现过渡
   -->
  <transition name="demo" appear>

  </transition>
</template>
<style>
.demo-enter {
  
}
</style>
```

**transition-group组件**

> 为列表统一设置,用法和transition组件基本一致,需要设置tag属性，保证html嵌套合理

