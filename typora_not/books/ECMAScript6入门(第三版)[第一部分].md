# 《ECAMScript 6 入门》 （第三版） [第一部分]

## 1. let和const命令

> 使用场景：
>
> 推荐使用let和const替代var, 需要修改的基本类型使用let, 其余的均使用const

### 特点

+ 不存在变量提升

```js
// var
console.log(foo); // undefined
var foo = 2;
// let
console.log(bar); // 报错 ReferenceError
let bar = 2;
```

+ 暂时性死区  `只要块级作用域内存在let，它所声明的变量就绑定在这个区域，不受外界影响`

```js
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}

// 暂时性死区不容易发现的例子
const bar = (x = y, y = 2) => [x, y]
bar(); // 报错
```

+ 不允许重复声明 `let不允许在相同作用域内，重复声明一个变量`

```js
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
```

+ 块级作用域

```js
// 场景1： es6之前
var tmp = new Date();
function f() {
  console.log(tmp);
  if(false) {
    var tmp = 'hello world';
  }
}
f(); // undefined [原因：es6之前只有全局作用域和函数作用域，没有块级作用域，则函数内部产生变量声明提升]
// 场景2：用来计数的循环变量泄露为全局变量
var s = 'hello';
for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}
console.log(i); // 5 [原因：变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量]

// 块级作用域例子  -- 使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了 （自调用函数）
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5 
} 
```

**let使用示例**

```js
// for循环的计数器使用let
// es6之前使用var的结果
var a = [];
for(var i = 0; i< 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}
a[6](); // 10
// 将var替换成let之后的结果 (代码省略...)
a[6](); // 6
```

**const使用示例**

> const一旦声明变量，就必须立即初始化，不能留到以后赋值

```js
const foo = {};
// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123
// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
// [原因：常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性]
```

**补充知识**

> es6声明变量的六种方法：var, function, let, const, import, class

**顶层对象属性**

> es6之前，全局变量即为顶层对象

```js
window.a = 1;
console.log(a); // 1
a = 2;
console.log(window.a); // 2

// es6开始
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined

// 补充：顶层对象的获取
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```

## 2. 变量的解构赋值

> ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构
>
> 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值

### 常见的数组解构情况

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [, , third] = ['foo', 'bar', 'baz'];
third // 'baz'

let [x, , y] = [1, 2, 3]
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // 'a'
y // undefined
z // []

let [x, y, z] = new Set(['a', 'b', 'c']);
x // 'a'
```

### 默认值

> 解构允许指定默认值

```js
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b
// ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的
```

### 对象解构

> 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，**变量必须与属性同名**，才能取到正确的值
>
> 问题点：只要有可能导致解构的歧义，就不得使用圆括号

```js
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined

let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

// 解构特例
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
```

### 用途

+ 交换变量值

```js
let x = 1, y = 2;
[x, y] = [y, x];
```

+ 从函数返回多个值

```js
// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

+ 函数参数的定义

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

+ 提起json数据

```js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

+ 函数参数的默认值
+ 遍历Map结构

```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

## 3. 字符串扩展

> 字符串扩展增大了unicode彪马的限制，es5只能识别到0xFFFF，更大的码点无法识别

### includes(), startsWith(), endsWith()

+ includes()：返回布尔值，表示是否找到了参数字符串
+ startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
+ endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

```js
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

// 配置第二个参数
// 使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束
let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

### repeat()

> repeat方法返回一个新字符串，表示将原字符串重复n次。

```js
hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
// 小数会被取整 (负数或者Infinity会报错,参数是字符串，会先转成number类型，NAN对应表示为0)
na'.repeat(2.9) // "nana”
```

### padStart(), padEnd()

> ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全

```js
// padStart和padEnd会接受两个参数，第一个指定字符串最小长度（若该值小于或等于原字符值，则返回源字符串）；第二个指定补全的字符串
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(5, 'ab') // 'xabab'

// 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串
abc'.padStart(10, '0123456789')
// '0123456abc'

// 如果省略第二个参数，默认使用空格补全
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
```

**用途**

+ 数值补全指定位数

+ 提示字符串格式

  ```js
  '12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
  '09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12”
  ```

### 模板字符串

> 模板字符串是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量

```js
// 支持单行或者多行字符串，如果在模板字符串中需要使用反引号，则前面要用反斜杠转义
let greeting = `\`Yo\` World!`;

```

**示例：模板编译**

```js
// 该模板使用<%...%>放置JavaScript代码，使用<%= ... %>输出JavaScript表达式
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;

// 编译方法
function compile(template){
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;
  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');
  template = 'echo(`' + template + '`);';
  let script =
  `(function parse(data){
    let output = "";
    function echo(html){
      output += html;
    }
    ${ template }
    return output;
  })`;
  return script;
}

// 调用编译
let parse = eval(compile(template));
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul>
```

## 4. 正则的扩展

### RegExp构造函数

```js
// es5中RegExp构造函数 (参数1字符串，参数2为修饰符)
var regex = new RegExp('xyz', 'i');
// 等价于
var regx = /xyz/i;
// 等价于
var regx = new RegExp(/xyz/i);
// es5报错，es6支持该操作，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符
var regex = new RegExp(/xyz/ig,'i');
```

### 修饰符

**u修饰符**

> ES6 对正则表达式添加了u修饰符，含义为“Unicode模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码

```js
// unicode字符表示法 必须加上u修饰符，才能识别当中的大括号，否则会被解读为量词
/\u{61}/.test('a'); // false
/\u{61}/u.test('a'); // true
```

### 具名组匹配

> 可以从YYYY-MM-DD中截取中year,month,day

```js
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31

// 具名组匹配”在圆括号内部，模式的头部添加“问号 + 尖括号 + 组名”（?<year>），然后就可以在exec方法返回结果的groups属性上引用该组名
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999

// replace函数参数
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
’2015-01-02'.replace(re, (
   matched, // 整个匹配结果 2015-01-02
   capture1, // 第一个组匹配 2015
   capture2, // 第二个组匹配 01
   capture3, // 第三个组匹配 02
   position, // 匹配开始的位置 0
   S, // 原字符串 2015-01-02
   groups // 具名组构成的一个对象 {year, month, day}
 ) => {
 let {day, month, year} = args[args.length - 1];
 return `${day}/${month}/${year}`;
});
```

## 5. 数值的扩展

### Number的扩展

**Number.isFinite(), Number.isNaN()**

```js
// isFinite判断是否为数值，isNaN判断是否为NaN (es6的优点在于不进行类型转换，es5的需要将非数值转为数值再比较)
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false

Number.isNaN(NaN) // true
Number.isNaN(15) // false

// 兼容写法
(function (global) {
  var global_isFinite = global.isFinite;

  Object.defineProperty(Number, 'isFinite', {
    value: function isFinite(value) {
      return typeof value === 'number' && global_isFinite(value);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
```

**Number.parseInt(), Number.parseFlaot()**

> 减少全局性方法应用，api操作和之前一致

### Math的扩展

**Math.trunc()**

> 取整使用，不需要担心正负数或者字符串型小数影响

```js
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc('123.456') // 123
```

**Math.sign()**

> 区分正负数，0，-0，非数值类型

```js
// 返回以下五种结果
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
```

### bigInt

> 解决js处理整数计算精度丢失问题，bigint类型不能和number类型进行混合运算

```js
1n + 2n // 3n
Integer(123) // 123n
```

## 6. 函数的扩展

### 函数默认值

```js
// es5
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World
// 传空字符串时，会被认为未传递数据

// es6
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```

**与解构赋值结合使用**

```js
// 如果没有提供参数，函数foo的参数默认为一个空对象
function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5
```

**函数length属性**

```js
// 返回值为，参数个数减去默认值参数个数
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```

### rest参数

> ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中
>
> rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错

```js
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```

### 箭头函数

**注意点**

+ 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
+ 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误
+ 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替
+ 不可以使用yield命令，因此箭头函数不能用作 Generator 函数

```js
// 返回对象 (直接返回一个对象，必须在对象外面加上括号，否则会报错)
let getTempItem = id => ({id: id, name: 'temp'});

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```

### 双冒号运算符

> 函数绑定运算符是并排的两个冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面

```js
foo::bar;
// 等同于
bar.bind(foo);
foo:bar(...arguments);
// 等同于
bar.apply(foo, arguments);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return obj::hasOwnProperty(key);
}
```

### 尾调用优化

> 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数

```js
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
/*
上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除f(x)的调用帧，只保留g(3)的调用帧

这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义
*/
```

> 只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化

```js
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
// 上面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one
```

### 尾递归

> 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误

```js
// 计算阶乘方法
// 最多需要保持n个调用记录，复杂度O(n)
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5) // 120
// 尾递归，只保留一个调用记录，复杂度O(1)
function factorial(n, total = 1) {
  if(n === 1) return total;
  return factorial(n-1, n * total);
}
factorial(5) // 120

// F(0)=0，F(1)=1, F(n)=F(n - 1)+F(n - 2)（n ≥ 2，n ∈ N*）
// 计算 Fibonacci 数列
function Fibonacci(n) {
  if(n <= 1) return 1;
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
Fibonacci(10) // 89
Fibonacci(100) // 堆栈溢出
Fibonacci(500) // 堆栈溢出

function Fibonacci2(n, ac1 = 1, ac2 = 2) {
  if(n <= 1) return ac2;
  return Fibonacci2( n - 1, ac2, ac1 + ac2)
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
```

> 尾递归优化只在严格模式下生效，正常模式需要自己实现尾递归优化

```js
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1, 100000)
// 100001
```

## 7. 数组的扩展

### 扩展运算符的应用

+ 复制数组

  ```js
  const a1 = [1, 2];
  const a2 = [...a1]; // 写法1
  const [...a2] = a1; // 写法2
  ```

+ 合并数组

  ```js
  // es5
  [1, 2].concat(more)
  // es6
  [1, 2, ...more]
  ```

+ 与解构赋值结合

  ```js
  const [first, ...rest] = [1, 2, 3, 4, 5];
  first // 1
  rest  // [2, 3, 4, 5]
  ```

+ 字符串

  ```js
  [...'hello']
  // ['h', 'e', 'l', 'l', 'o']
  ```

+ 实现Iterator接口的对象

  > 任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组
  
  ```js
  let nodeList = document.querySelectorAll('div');
  let array = [...nodeList];
  ```
  
+ Map 和 Set 结构，Generator 函数

  ```js
  // map
  let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
  ]);
  
  let arr = [...map.keys()]; // [1, 2, 3]
  // generator
  const go = function*(){
    yield 1;
    yield 2;
    yield 3;
  };
  
  [...go()] // [1, 2, 3]
  ```

### 数字扩展的api

**copyWithin()**

>数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组

```js
/*
target（必需）：从该位置开始替换数据。
start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
*/
Array.prototype.copyWithin(target, start = 0, end = this.length)
// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]
```

**find(), findIndex()**

> find	用于找出**第一个**符合条件的数组成员，如果找不到符合条件的成员，返回undefined
>
> findIndex	返回**第一个**符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1

```js
// find
[1, 4, -5, 10].find(n => n < 0)
// -5
// findIndex
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

**entries(), keys(), values()**

> keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b”
```

## 8. 对象的扩展

### Object.is()

> 用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致

```js
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false
```

### Objcet.assign()

> Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）

```js
const target = {a: 1};
const source1 = {b: 2};
Object.assign(target, source1);
target // {a:1, b:2}
// 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
const target = { a: 1, b: 1 };
const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

**用途**

+ 为对象添加属性

```js
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
```

+ 为对象添加方法

```js
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```

+ 克隆对象（）

```js
// 将原始对象拷贝到一个空对象，就得到了原始对象的克隆,只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链
function clone(origin) {
  return Object.assign({}, origin);
}

function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
```

+ 合并多个对象

+ 为属性指定默认值

  ```js
  const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html'
  };
  
  function processContent(options) {
    options = Object.assign({}, DEFAULTS, options);
    console.log(options);
    // ...
  }
  ```

### 属性的遍历

1. For... in

   > for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）

2. Object.keys(obj)

   > Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名

3. Object.getOwnPropertyNames(obj)

   > Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
   
4. Object.getOwnPropertySymbols(obj)

   > Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名

5. Reflect.ownKey(obj)

   > Reflect.ownKeys返回一个数组，包含对象自身的所有健名，**不管是Symbol或字符串，也不管是否可枚举**

   ```js
   /*
   首先遍历所有数值键，按照数值升序排列。
   其次遍历所有字符串键，按照加入时间升序排列。
   最后遍历所有 Symbol 键，按照加入时间升序排列
   */
   Reflect.ownKeys({
     [Symbol()]: 0,
     b: 0,
     10: 0,
     2: 0,
     a: 0
   })
   // ['2', '10', 'b', 'a', Symbol()]
   ```

### super关键字

> super指向当前对象的原型对象

```js
// super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错
const proto = {
  foo: 'hello'
};

const obj = {
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello”
```

### Null传导运算符

> 解决对象多级嵌套多重判空的繁琐操作
>
> 【注意】需要babelv7.8.0版本以上，如果版本过低，需要安装@babel/plugin-proposal-optional-chaining

```js
// 过去读取message.body.user.firstName安全写法
cosnt firstName = (message
                   && message.body
                   && message.body.user
                   &&message.body.user.firstName || 'default');
// null传导运算符 (?.)
const firstName = message?.body?.user?.firstName || 'default';
```

**用法**

+ `obj?.prop` // 读取对象的属性
+ `obj?.[expr]` // 读取对象属性（属性为变量）
+ `func?.(...args)` // 函数或对象方法的调用
+ new C?.(...args) // 构造函数的调用

## 9. Symbol

> ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值

```js
let mySymbol = Symbol();
// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';
// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};
// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!”
```

### 属性名的遍历

> Object.getOwnPropertySymbols(obj) 和 Reflect.ownKeys(obj)

### Symbol.for(), Symbol.keyFor()

> 重新使用同一个Symbol值

```js
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2; // true

// Symbol.keyFor方法会返回一个已登记的Symbol类型值的key
// Symbol.for为 Symbol 值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值
let s1 = Symbol.for('foo');
Symbol.keyFor(s1); // 'foo'
```

## 10. Set和Map

### Set

> 它类似于数组，但是成员的值都是唯一的，没有重复的值

+ `add(value)`: 添加某个值，返回Set解构本身
+ `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
+ `has(value)`：返回一个布尔值，表示该值是否为Set的成员。
+ `clear()`：清除所有成员，没有返回值。

```js
s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
```

**set实现集合功能（交、并、差）**

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

### Map

> Object 结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适

```js
// size熟悉返回Map结构的成员总数;
// 其它方法set(key, value); get(key); has(key); delete(key);clear()
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```