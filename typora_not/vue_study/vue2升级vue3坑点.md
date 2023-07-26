## vue2升级vue3注意点

### 1. $refs的变化

#### 1.1 普通组件使用ref

```vue
<template>
<!-- 3. 标签中添加ref (ref名称必须和下面定义的一致) -->
	<el-input ref="saveTagInput">
</template>
<script>
export default defineComponent({
  // 1. 定义数据	
  const saveTagInput = ref(null);
  // 4. 使用ref数据
  const showInput = (v)=>{
    nextTick(()=>{
      // saveTagInput.value 相对于dom元素
      saveTagInput.value.focus();
    })
  }
  
  // 2. 导出数据
  return {saveTagInput}
})
</script>
```

#### 1.2 v-for中使用ref

> 因为vue3中不会自动创建数组。要从单个绑定获取多个 `ref`，需要将 ref 绑定到一个更灵活的函数上
>
> 参考链接：[vue3在v-for中使用ref案例](https://www.e-learn.cn/topic/3846958)

```vue
<!-- vue2写法 -->
<div v-for="item in 2" :ref="setItemRef"></div>
<script>
  mounted () {
    console.log(this.$refs.setItemRef) // [div, div]
  }
</script>
 
<!-- vue3写法 (不能用push, 会在更新的时候造成bug, 元素会重复) -->
<div
  v-for="(item, index) in state.competitorList"
  :ref="el=> competitor[index]=el"></div>
 
<script>
import { ref, onBeforeUpdate } from 'vue'
export default defineComponent({
  setup(){
    const competitor = ref([]);
    // 使用refs数组
    const handleUseRefs = ()=> {
      console.log(competitor.value); // [div, div]
    }

    // 确保在每次更新之前重置ref
    onBeforeUpdate(() => {
      competitor.value = []
    })
    
    return {
      competitor,
    }
  }
})
 
</script>
```



### 2. Element-plusUI兼容

#### 2.1 el-dialog不支持直接添加class名称

```vue
<!-- 错误写法 -->
<el-dialog class="text-model"></el-dialog>
<!-- 正确写法(通过查看源码发现自定义class为customClass) -->
<el-dialog customClass="text-model"></el-dialog>
```

#### 2.2 scss中不支持/deep/

```scss
/* scss中不支持/deep/，需要改写成::v-deep */
.content::v-deep .el-dialog {
  background: blue;
}
```

#### 2.3 el-dialog需要将v-model改成modelValue

```html
<!-- 如果使用v-model报错，可以使用modelValue实现双向绑定 -->
<el-dialog :modelValue="visible"></el-dialog>
```

#### 2.4 element-plus日期格式化

>  element-ui使用的是day.js日期格式化插件，format格式发生了部分改变：常用的格式显示如下（一般在日期筛选组件中会使用到）   使用format指定输入框的格式。默认情况下，组件接受并返回**Date对象**

| 格式   | 输出    | 描述                       |
| ------ | ------- | -------------------------- |
| `YYYY` | 2018    | 四位数的年份               |
| `MM`   | 01-12   | 月份，两位数               |
| `DD`   | 01-31   | 月份里的一天，两位数       |
| `d`    | 0-6     | 一周中的一天，星期天是 0   |
| `H`    | 0-23    | 小时                       |
| `HH`   | 00-23   | 小时，两位数               |
| `h`    | 1-12    | 小时, 12 小时制            |
| `hh`   | 01-12   | Hours, 12 小时制, 两位数   |
| `m`    | 0-59    | 分钟                       |
| `mm`   | 00-59   | 分钟，两位数               |
| `ss`   | 00-59   | 秒 两位数                  |
| `SSS`  | 000-999 | 毫秒 三位数                |
| `Z`    | +05:00  | UTC 的偏移量               |
| `ZZ`   | +0500   | UTC 的偏移量，数字前面加上 |

### 3. ref和reactive区别

#### 3.1 使用建议

> 如果只是单独的修改一个对象的某个值，且已知这个对象的所有key值，建议使用**reactive**。
>
> 如果需要对这个对象单独赋值，建议使用**ref**定义

#### 3.2 区别

**ref**

+ 作用：定义一个数据的响应式
+ 语法：const xxx = ref(initValue) 
  + 创建一个包含响应式数据的引用(reference)对象
  + js中操作数据: xxx.value
  + 模板中操作数据: 不需要.value
+ 使用场景：一般用来定义一个基本类型的响应式数据

**reactive**

+ 作用：定义多个数据的响应式
+ const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
+ 响应式转换是“深层的”：会影响对象内部所有嵌套的属性
+ 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的

#### 3.3 比较vue2和vue3响应式

**vue2响应式**

+ 核心：

  + 对象：通过defineProperty对对象的已有属性值的读取和修改进行劫持（监视/拦截）
  + 数组：通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持

  ```js
  Object.defineProperty(data, 'count', {
      get () {}, 
      set () {}
  })
  ```

+ 问题：
  + 对象直接新添加的属性或删除已有属性, 界面不会自动更新
  + 直接通过下标替换元素或更新length, 界面不会自动更新 arr[1] = {}

**vue3响应式**

+ 核心：

  + 通过Proxy(代理): 拦截对data任意属性的任意(13种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...

  + 通过 Reflect(反射): 动态对被代理对象的相应属性进行特定的操作

    ```js
    new Proxy(data, {
    	// 拦截读取属性值
        get (target, prop) {
        	return Reflect.get(target, prop)
        },
        // 拦截设置属性值或添加新属性
        set (target, prop, value) {
        	return Reflect.set(target, prop, value)
        },
        // 拦截删除属性
        deleteProperty (target, prop) {
        	return Reflect.deleteProperty(target, prop)
        }
    })
    
    proxy.name = 'tom' 
    ```

### 4. watch监听

#### 4.1 watch监听props属性

**使用toRefs**

```js
import { ref, onMounted, watch, toRefs } from 'vue'

setup(props){
  // 使用`toRefs`创建对prop的`user` property的响应式引用
  const {user} = toRefs(props);
  
  watch(user, (newVal)=> {
    console.log(newVal)
  })
}
```

**使用watch直接监听**

```js
import { ref, onMounted, watch } from 'vue'

setup(props){
  
  watch(() => props.user,(newVal)=> {
     console.log(newVal)
  })
}
```

#### 4.2 watch监听模板引用

> 侦听模板引用的变更可以替代onMounted生命周期钩子
>
> 问题：`watch()` 和 `watchEffect()` 在 DOM 挂载或更新*之前*运行副作用，所以当侦听器运行时，模板引用还未被更新
>
> 配置参数：`flush: 'post'`
>
> 解释：将在 DOM 更新*后*运行副作用，确保模板引用与 DOM 保持同步，并引用正确的元素

```vue
<template>
  <div ref="root">This is a root element</div>
</template>

<script>
  import { ref, watchEffect } from 'vue'

  export default {
    setup() {
      const root = ref(null)

      watchEffect(() => {
        console.log(root.value) // => <div>This is a root element</div>
      }, {flush: 'post'})

      return {
        root
      }
    }
  }
</script>
```



### 5. inject和provide用法

> provide注入的数据不建议在子代组件进行修改，如果需要更新数据，可使用provide方法，实现数据修改
>
> **建议尽可能将对响应式 property 的所有修改限制在定义 provide 的组件内部**

**api参数配置**

`provide`函数允许提供两个参数:

1. name(`<String>`类型)
2. value

`inject`函数有两个参数：

1. 要 inject 的 property 的 name
2. 默认值（**可选**）



**子组件共享上层组件数据**

```vue
<!-- 上层组件 -->
<template>
  <MyMarker />
</template>
<script>
import { provide,readonly } from 'vue'
import MyMarker from './MyMarker.vue'

export default {
  components: {
    MyMarker
  },
  setup() {
    provide('geolocation', readonly({
      longitude: 90,
      latitude: 135
    }));
  }
}
</script>
<!-- 子孙组件 -->
<script>
import { inject } from 'vue'
export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    return {
      userLocation,
      userGeolocation
    }
  }
}
</script>
```

**子组件更新共享数据**

```vue
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide, readonly, ref } from 'vue'
import MyMarker from './MyMarker.vue'

export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const updateLocation = () => {
      location.value = 'South Pole'
    }
    provide('location', readonly(location))
    provide('updateLocation', updateLocation)
  }
}
</script>

<!-- src/components/MyMarker.vue -->
<script>
import { inject } from 'vue'
export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const updateUserLocation = inject('updateLocation')
    return {
      userLocation,
      updateUserLocation
    }
  }
}
</script>
```

### 6. chrome浏览器跨域

>  对于vite本地起服务，并且chrome浏览器>=91。跨域请求就有问题，

升级到chrome91后，浏览器删除了[chrome://flags](chrome://flags/)#same-site-by-default-cookies

**暂时解决方案：**

https://juejin.cn/post/6969836867554377759

**永久方案：**

修改host: 127.0.0.1 [test-tikumis.zuoyebang.cc](http://test-tikumis.zuoyebang.cc/)

抛弃上面所有方案，增加一个配置`followRedirects: true`

### 7. mixins

> 问题1：mixin中同名属性如何处理？
>
> 问题2：mixin中同名生命周期谁先执行？
>
> [备注]：答案看下方代码

```js
// mixin
const myMixin = {
  data() {
    return {
      message: 'hello',
      foo: 'abc'
    }
  },
   created() {
    console.log('mixin 对象的钩子被调用')
  }
}

// vue组件
const app = Vue.createApp({
  mixins: [myMixin],
  data() {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created() {
    console.log(this.$data) // => { message: "goodbye", foo: "abc", bar: "def" }
    console.log('组件钩子被调用')
  }
});

// => "mixin 对象的钩子被调用"
// => "组件钩子被调用"
```

**不足**

1. Mixin 很容易发生冲突：因为每个 mixin 的 property 都被合并到同一个组件中，所以为了避免 property 名冲突，你仍然需要了解其他每个特性
2. 可重用性是有限的：我们不能向 mixin 传递任何参数来改变它的逻辑，这降低了它们在抽象逻辑方面的灵活性

**解决方案**

为了解决这些问题，我们添加了一种通过逻辑关注点组织代码的新方法：组合式API

