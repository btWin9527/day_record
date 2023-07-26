# 《ECAMScript 6 入门》 （第三版） [第二部分]

## 1. Proxy

> Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

```js
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});
```

**同一个拦截器，设置多个拦截操作**

```js
// new Proxy(target, handler);
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true
```

### 拦截方式

+ get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']
+ set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值
+ has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值
+ deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
+ ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
+ apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
+ construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。

### Proxy实例的方法

**get()**

> get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（即this关键字指向的那个对象），其中最后一个参数可选

```js
// 使用get拦截实现属性的链式操作
var pipe = (function () {
  return function (value) {
    var funcStack = [];
    var oproxy = new Proxy({} , {
      get : function (pipeObject, fnName) {
        if (fnName === 'get') {
          return funcStack.reduce(function (val, fn) {
            return fn(val);
          },value);
        }
        funcStack.push(window[fnName]);
        return oproxy;
      }
    });

    return oproxy;
  }
}());

var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63
```

**set()**

> set方法用于拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和Proxy实例本身，其中最后一个参数可选

```js
// 假定Person对象有一个age属性，该属性应该是一个不大于200的整数，那么可以使用Proxy保证age的属性值符合要求。
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }
    // 对于age以外的属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;
person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```

**proxy实例：Web服务的客户端**

```js
const service = createWebService('http://example.com/data');

service.employees().then(json => {
  const employees = JSON.parse(json);
  // ···
});

function createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return () => httpGet(baseUrl+'/' + propKey);
    }
  });
}
```

## 2. Reflect

> reflect对象是为了操作对象提供的新API。
>
> Object.defineProperty(obj, name, desc)  无法定义属性，抛出错误
>
> Reflect.defineProperty(obj, name, desc)则会返回false

```js
// 示例
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
})
```

### 常用API介绍

**Reflect.get(target, name, receiver) **

> Reflect.get 方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。如果name 属性部署了该读取函数(getter)，则读取函数的this绑定receiver。

```js
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};
var myReceiverObject = {
  foo: 4,
  bar: 4,
};

Reflect.get(myObject, 'baz', myReceiverObject); // 8
```

**Reflect.set(target, name, value, receiver)**

> Reflect.set方法设置target对象的name属性等于value

```js
var myObject = {
  foo: 1,
  set bar(value) {
    return this.foo = value;
  },
}

myObject.foo // 1

Reflect.set(myObject, 'foo', 2);
myObject.foo // 2

Reflect.set(myObject, 'bar', 3)
myObject.foo // 3

// 示例
/*
Reflect.set一旦传入receiver，就会将属性赋值到receiver上面（即obj），导致触发defineProperty拦截。如果Reflect.set没有传入receiver，那么就不会触发defineProperty拦截
*/
let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
```

**Reflect.has(obj, name)**

> Reflect.has方法对应name in obj 里面的in运算符

```js
var myObject = {
  foo: 1,
};
// 旧写法
'foo' in myObject // true
// 新写法
Reflect.has(myObject, 'foo') // true
```

**Reflect.deleteProperty(obj, name)**

> Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性

```js
// 该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回true；删除失败，被删除的属性依然存在，返回false
const myObj = {foo: 'bar'};
// 旧写法
delete myObj.foo;
// 新写法
Relect.deleteProperty(myObj, 'foo');
```

**Reflect.apply(func, thisArg, args)**

> Reflect.apply方法等同与Function.prototype.apply.call(func, thisArg, args)

```js
const ages = [11, 33, 12, 54, 18, 96];

// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);
```

**Reflect.ownKeys(target)**

> Reflect.ownKeys方法用于返回对象的所有熟悉，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和

```js
var myObj = {
  foo: 1,
  bar: 2,
  [Symbol.for('bar')]: 3,
  [Symbol.for('bing')]: 4,
};
// 旧写法
Object.getOwnPropertyNames(myObj) // ['foo', 'bar']
Object.getOwnPropertySymbols(myObj) // [Symbol(baz), Symbol(bing)]
// 新写法
Reflect.ownKeys(myObj)
```

## 3. Promise

**特点**

1. promise对象的状态不受外界影响，只有异步操作的结果可以决定当前是哪一种状态，其它操作无法改变该状态
2. 一旦状态改变，就不会再变

**缺点**

1. 无法取消promise,一旦新建就会立即执行，无法中途取消

2. 如果不设置回调函数，promise内部抛出的错误，不会反映到外部

   ```js
   // Promise 内部的错误不会影响到 Promise 外部的代码
   const someAsyncThing = function() {
     return new Promise(function(resolve, reject) {
       // 下面一行会报错，因为x没有声明
       resolve(x + 2);
     });
   };
   
   someAsyncThing().then(function() {
     console.log('everything is great');
   });
   
   setTimeout(() => { console.log(123) }, 2000);
   // Uncaught (in promise) ReferenceError: x is not defined
   // 123
   ```

   

3. 当处于pending状态时，无法得知目前进展到哪一个阶段（刚开始还是即将完成）

```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

**promise封装ajax**

```js
var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

### Promise.then()

> then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法

```js
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);
```

### Promise.catch()

> Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数

```js
// 写法一
var promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 写法二
var promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
```

### Promise.all()

> Promise.all方法将多个Promise实例，包装成一个新的Promise实例

```js
// 只有等p1, p2, p3都返回结果了，才会执行Promise.all的then方法
var p = Promise.all([p1, p2, p3]);
```

**Promise.race()**

```js
// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数
var p = Promise.race([p1, p2, p3]);
```

### promise的应用

**加载图片**

```js
// 图片的加载写成一个Promise，一旦加载完成，Promise的状态就发生变化
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```

## 4. Iterator和for...of循环

> 为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署了Iterator接口，就可以完成遍历操作

**遍历过程**

1. 创建一个指针对象，指向当前数据结构的起始位置
2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员
3. 第二次调用指针对象的next方法，指针指向数据结构的第二个成员
4. 不断调用指针对象的next方法，知道它指向数据结构的结束为止

```js
// 模拟next方法返回
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```

### 调用Iterator接口场合

1. 解构赋值

   ```js
   let set = new Set().add('a').add('b').add('c');
   
   let [x,y] = set;
   // x='a'; y='b'
   
   let [first, ...rest] = set;
   // first='a'; rest=['b','c'];
   ```

   

2. 扩展运算符

   ```js
   // 例一
   var str = 'hello';
   [...str] //  ['h','e','l','l','o']
   
   // 例二
   let arr = ['b', 'c'];
   ['a', ...arr, 'd']
   // ['a', 'b', 'c', 'd']
   ```

3. yield*

   ```js
   let generator = function* () {
     yield 1;
     yield* [2,3,4];
     yield 5;
   };
   
   var iterator = generator();
   
   iterator.next() // { value: 1, done: false }
   iterator.next() // { value: 2, done: false }
   iterator.next() // { value: 3, done: false }
   iterator.next() // { value: 4, done: false }
   iterator.next() // { value: 5, done: false }
   iterator.next() // { value: undefined, done: true }
   ```

4. 其它场合

   ```js
   for...of
   Array.from()
   Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
   Promise.all()
   Promise.race()
   ```

###  for...of循环

> for...of循环，作为遍历所有数据结构的统一的方法(必须具备iterator接口)

## 5. Generator函数

> Generator建议主要了解，异步操作同步写法建议使用async + await简写

**示例：给普通对象添加iterator**

```js
// 使用Generator函数实现普通对象的for...of操作
//第一步 创建一个无迭代器接口的对象
let obj = {
	name: "xiaoChen",
	age: 21
}
//第二步 写一个迭代器接口 （用到了keys（），忘了往上看看哈）
function* objectEntries(obj){
    const Keys = Object.keys(obj);
    for(let key of Keys){
        yield [key,obj[key]];
    }
}
//第三步 给obj接口
obj[Symbol.iterator] = objectEntries;
//第四步 遍历
for(let [name,age] of objectEntries(obj)){
  //成功的遍历出obj里面的属性
  console.log(`${name}:${age}`); //name: "xiaoChen",age: 21
}
```

**示例：ajax操作同步表达**

```js
function* main() {
  var result = yield request('http://some.url');
  var resp = JSON.parse(result);
  console.log(resp.value);
}
function request(url){
  makeAjaxCall(url, function(response){
    it.next(response);
  });
}
var it = main();
it.next();
```

### 异步编程

+ 回调函数
+ 事件监听
+ 发布/订阅
+ Promise对象

## 6. async函数

> async为generator的语法糖，方便使用

```js
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

**优点**

+ 内置执行器

  `Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行`

+ 更好的语义

  `async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果`

+ 更广的适用性

  `co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）`

+ 返回值是promise

  `async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了`

### 基本用法

```js
// getStockPriceByName 方法只处理获取数据的操作，满足函数的单一原则
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}
// 操作数据
getStockPriceByName('good').then(function(result){
  // 处理返回数据
  console.log(result);                            
})
// 错误处理
.catch(err=> console.log(err))

```

### 语法

> async函数的语法规则总体上比较简单，难点是错误处理机制
>
> await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中

```js
// 只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}

f()
.then(v => console.log(v))
.catch(e => console.log(e)) // 出错了

// 错误处理
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world
```

**不存在关系的异步操作，同时触发**

```js
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

```

### async实现原理

> async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里

```js
async function fn(args) {
  // ...
}
// 等同于
function fn(args){
  return spawn(function*(){
    
  })
}

// 自动执行器
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next; 
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

###  异步处理方法对比

> 情景： 假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值

**promise写法**

```js
function chainAnimationsPromise(elem, animations) {

  // 变量ret用来保存上一个动画的返回值
  let ret = null;

  // 新建一个空的Promise
  let p = Promise.resolve();

  // 使用then方法，添加所有动画
  for(let anim of animations) {
    p = p.then(function(val) {
      ret = val;
      return anim(elem);
    });
  }

  // 返回一个部署了错误捕捉机制的Promise
  return p.catch(function(e) {
    /* 忽略错误，继续执行 */
  }).then(function() {
    return ret;
  });

}
```

**Generator写法**

```js
function chainAnimationsGenerator(elem, animations) {
  return spawn(function*() {
    let ret = null;
    try {
      for(let anim of animations) {
        ret = yield anim(elem);
      }
    } catch(e) {
      /* 忽略错误，继续执行 */
    }
    return ret;
  });
}
```

**async写法**

```js
async function chainAnimationsAsync(elem, animations) {
  let ret = null;
  try {
    for(let anim of animations) {
      ret = await anim(elem);
    }
  } catch(e) {
    /* 忽略错误，继续执行 */
  }
  return ret;
}
```

### 常见示例

**按顺序完成异步操作**

> 情景：一组异步操作，需要按照顺序完成。依次远程读取一组URL，然后按照读取的顺序输出结果 (并发发出远程请求)

```js
// 虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。后面的for..of循环内部使用了await，因此实现了按顺序输出
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url=> {
    const response await fetch(url);
    return response.text();
  });
  // 按次序输出
  for(const textPromise of textPromises){
    console.log(await textPromise);
  }
}
```

## 7. Class的基本语法

> constructor 方法默认返回实例对象

**特点**

+ 不存在变量提升

  ```js
  new Foo(); // ReferenceError
  class Foo{}
  ```

### 私有方法

> es6不提供私有方法，可以模拟实现

```js
// _  命名区分
class Widget {
  // 公共方法
  foo(baz){
    this._bar(baz)
  }
  
  // 私有方法
  _bar(baz) {
    return this.snaf = baz
  }
}
// Symbol命名
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};
```

### 私有属性

```js
class Point {
  #x;

  constructor(x = 0) {
    #x = +x; // 写成 this.#x 亦可
  }

  get x() { return #x }
  set x(value) { #x = +value }
}
```

### this指向

> 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错

### class的getter和setter

```js
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'

```

### class的静态方法

> 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法

```js
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

### class的继承

> 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象

```js
class Point {
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

**es5和es6继承机制对比**

+ Es5: 实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)
+ es6: 先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this

### super关键字

**当做函数调用**

> 只能使用在class中的子类构造函数中

```js
// super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，因此super()在这里相当于A.prototype.constructor.call(this)

class A {}

class B extends A {
  constructor() {
    super();
  }
}
```

**当做对象调用**

> 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象

```js
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2
```

## 8. 修饰器



