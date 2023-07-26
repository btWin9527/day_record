## ts类型示例

### 1. 基础类型

#### 1.1  基础数据类型

#### 1.2 数组类型

```typescript
let arr: number[] = [1,2,3];
// or
let arr: Array<number> = [1,2,3];
```

#### 1.3 元祖类型

> 表示一个已知元素数量和类型的数组

```typescript
let tuple: [string, number] = ['hello world', 0];
```

#### 1.4 无返回值函数

```typescript
function console(): void {
  console.log('test')
}
```

#### 1.5 类型断言

> 有时候当你比 TypeScript 更了解某个变量值的详细信息，可以通过 **类型断言 **这种方式来覆盖它的判断

```typescript
function inputBgChange(): void {
  let oInput: HTMLInputElement;
  if(document.querySelector('.oInput')) {
    oInput = document.querySelector('.oInput') as HTMLInputElement; // 类型断言，解决ts解析报错
    oInput.style.background = 'red';
  }else {
    oInput = document.createElement('input');
    document.body.appendChild(oInput);
    oInput.className = 'oInput';
    oInput.style.background = 'red';
  }
}
```

### 2. 接口

#### 2.1 定义对象

```typescript
// 定义对象
interface Person {
  age?: number, // 可选属性
  name: string,
  readonly play: string, // 只读属性
  [propName: string]: any // 任意属性
}

let jack: Person = {
  name: 'jack',
  sex: 'male',
  play: 'singing'
}
```

#### 2.2 定义函数

```ts
interface CompareFunc {
  (first: number, second: number): number;
}

let numCompare: CompareFunc = function(first: number, second: number) {
  return first > second ? first : second;
}
```

### 3. 泛型

> 泛型是强类型语言中比较重要的一个概念，它允许我们在编写代码的时候暂不指定类型，使用一些以后才指定的类型，在实例化时作为参数指明这些类型

#### 3.1 泛型使用

```ts
function findFirst<T> (arr: T[]): T {
  return arr[0]
}
findFirst<number>([1,2,3]);
// => 1
findFirst<string>(['hello','world']);
// 'hello'
// vue中使用
const year = ref<string | number>('2020');
```

#### 3.2 泛型约束

> 泛型的功能过于强大和灵活，为了避免像 `any` 一样造成滥用，我们可以使用 `extends` 关键字对泛型进行约束作用

```ts
//  getLength 函数被 LengthWise 接口约束住了，我们传入的泛型参数必须包含 length 属性
interface Lengthwise {
  length: number;
}
function getLength<T extends Lengthwise>(arg: T): number {
  return arg.length;
}
```

### 4. 常用ts类型示例

#### 4.1 dom相关定义

```ts
// vue3中定义元素的ref属性
const inputRef = ref<HTMLElement|null>(null)

// 鼠标点击事件
const handleClick = (evt: MouseEvent) => {
   console.log('click')
}
```

#### 4.2 注解

**注解props**

> vue对定义了type的prop执行运行时验证，要将这些类型提供给ts，需要使用PropType知名构造函数

```vue
<script lang="ts">
import { defineComponent, PropType } from 'vue';
  
interface Book {
  title: string
  author: string
  year: number
}
  
export default defineComponent({
  props:{
    callback: {
      type: Function as PropType<()=> void>
    },
  	book: {
      type: Object as PropType<Book>,
      required: true
    },
  id: [Number, String]
  }
})
</script>
```

**注解computed**

> 由于 Vue 声明文件的循环特性，TypeScript 可能难以推断 computed 的类型。因此，你可能需要注解计算属性的返回类型

```vue
<script lang="ts">
import { defineComponent } from 'vue'

const Component = defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // 需要注解
    greeting(): string {
      return this.message + '!'
    },
    // 在使用 setter 进行计算时，需要对 getter 进行注解
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
</script>
```

**注解emit**

> 我们可以为触发的事件注解一个有效载荷。另外，所有未声明的触发事件在调用时都会抛出一个类型错误

```tsx
const Component = defineComponent({
  emits: {
    addBook(payload: {bookName: string}) {
      // perform runtime 验证
      return payload.bookName.length > 0
    }
  },
  methods: {
     onSubmit() {
      this.$emit('addBook', {
        bookName: 123 // 类型错误！
      })
      this.$emit('non-declared-event') // 类型错误！
    }
  }
})
```

#### 4.3 响应式变量类型声明

```js
import {defineComponent, reactive} from 'vue';

interface Book {
  title: string
  year?: number
}
  
export default defineComponent({
  name: 'HelloWorld',
  setup(){
    // 泛型
    const book = reactive<Book>({title: 'Vue 3 Guide'});
  	// or 类型声明
  	const book: Book = reactive({title: 'Vue 3 Guide'});
    // or 类型断言
    const book = reactive({ title: 'Vue 3 Guide' }) as Book
  }
})
```

#### 4.4 事件处理器添加类型

>在处理原生 DOM 事件的时候，正确地为处理函数的参数添加类型

```vue
<template>
  <input type="text" @change="handleChange" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    // `evt` 事件对象 Event
    const handleChange = (evt: Event) => {
      console.log((evt.target as HTMLInputElement).value) // evt.target 为input元素
    }
    return { handleChange }
  }
})
</script>
```

