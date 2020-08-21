# my Interview

## 1. vue 项目搭建流程

## 2. 深拷贝和浅拷贝

> 深拷贝和浅拷贝都是js复制对象的操作

```js
// 浅拷贝, 深拷贝, 赋值对对象的对比
// 对象赋值
let obj1 = {name: '浪里行舟', arr: [1,[2,3],4]};
let obj2 = obj1;
obj2.name = "阿浪";
obj2.arr[1] = [5,6,7];
console.log('obj1',obj1); // { name: '阿浪', arr: [ 1, [ 5, 6, 7 ], 4 ] }
console.log('obj2',obj2) // obj2 { name: '阿浪', arr: [ 1, [ 5, 6, 7 ], 4 ] }

// 浅拷贝
let obj1 = {
    name : '浪里行舟',
    arr : [1,[2,3],4],
};
let obj3 = shallowClone(obj1);
obj3.name = '阿浪';
obj3.arr[1] = [5,6,7];
function shallowClone(source) {
  var target = {};
  for(var i in source){ // 创建临时对象，遍历对象赋值实现浅拷贝
    if(source.hasOwnProperty(i)){
      target[i] = source[i];
    }
  }
  return target;
}
console.log('obj1',obj1) // obj1 { name: '浪里行舟', arr: [ 1, [ 5, 6, 7 ], 4 ] }
console.log('obj3',obj3) // obj3 { name: '阿浪', arr: [ 1, [ 5, 6, 7 ], 4 ] }

// 深拷贝
let obj1 = {
    name : '浪里行舟',
    arr : [1,[2,3],4],
};
let obj4 = deepClone(obj1);
obj4.name = '阿浪';
obj4.arr[1] = [5,6,7];
function deepClone(obj) {
  if(obj === null) return obj;
  if(obj instanceof Date) return new Date(obj);
  if(obj instanceof RegExp) return new RegExp(obj);
  if(typeof  obj !== 'object') return obj;
  let cloneObj = new obj.constructor();
  for(let key in obj){
    if(obj.hasOwnProperty(key)){ // 递归拷贝
      cloneObj[key] = deepClone(obj[key]);
    }
  }
  return cloneObj;
}
console.log('obj1',obj1) // obj1 { name: '浪里行舟', arr: [ 1, [ 2, 3 ], 4 ] }
console.log('obj4',obj4) // obj4 { name: '阿浪', arr: [ 1, [ 5, 6, 7 ], 4 ] }

```

### 2.1 浅拷贝

> 定义：创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝(基本类型拷贝值, 引用类型拷贝地址)【浅拷贝修改其中一个对象改变引用类型的数据时，另一个对象也会进行修改】

**常用方法**

```js
// 1. Object.assign()
// @description 把任意多个的源对象自身的可枚举属性拷贝给目标对象，并返回目标对象 
let obj1 = { person: {name: "kobe", age: 41},sports:'basketball' };
let obj2 = Object.assign({},obj1);
obj2.person.name = "wade";
obj2.sports = 'football';
console.log(obj1); // { person: { name: 'wade', age: 41 }, sports: 'basketball' }

// 2. 函数库lodash.clone方法
var _ = requrie('lodash');
var obj1 = {
  a: 1,
  b: {f: {g: 1}},
  c: [1, 2, 3]
};
var obj2 = _.clone(obj1);
console.log(obj1.b.f === obj2.b.f); // true

// 3. 展开运算符...
let obj1 = { name: 'Kobe', address:{x:100,y:100}}
let obj2= {... obj1}
obj1.address.x = 200;
obj1.name = 'wade'
console.log('obj2',obj2) // obj2 { name: 'Kobe', address: { x: 200, y: 100 } }

// 4. Array.prototype.concat()    数组浅拷贝方法

// 5. Array.prototype.slice()      同上

```

### 2.2 深拷贝

> 定义：将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且【修改新对象不会影响原对象】

```js
// 1. JSON.parse(JSON.stringfy())
// @description 该方法可以实现数组或对象的
let arr = [1,3,{username: 'kobe'}];
let arr4 = JSON.parse(JSON.stringify(arr));
arr4[2].username = 'duncan';
console.log(arr,arr4);

// 2. lodash 中cloneDeep方法
var _ = require('lodash');
var obj1 = {
  a: 1,
  b: {f: {g: 1}},
c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f); // false

```

## 3. js继承

## 4. es6常用语法

## 5. 文件上传与下载
