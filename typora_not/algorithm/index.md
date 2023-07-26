# 算法题记录

## 0. 复杂度

### 时间复杂度

> 这就是大 **O** 时间复杂度表示法。大 **O** 时间复杂度实际上并不具体表示代码真正的执行时间，而是表示代码执行时间随数据规模增⻓的变化趋势，所以，也叫作渐进时间复杂度，简称时间复杂度

```js
//  fun1 中第1行都是常􏰀，对 n 的影响不大，所以总的时间复杂度要看第2、3行的循环，即时间复杂 度为: O(n)  
function fun1(n) {
    let sum = 0,i = 0;
    for(; i <= n; i++) {
			sum += i; 
    }
		return sum 
 }
// fun2 中循环1的时间复杂度为 O(n) ，循环2的时间复杂度为 O(n2)，当 n 趋于无穷大时，总体的时 间复杂度要趋于 O(n2) ，即上面代码的时间复杂度是 O(n2)
function fun2(n) {
		let sum = 0, sum1 = 0, i = 0, j = 0;
  	for(; i <= n; i++) { // 循环1
			sum += i; 
    }
		for(i = 0; i <= n; i++) { // 循环2 
      for(j = 0; j <= n; j++) {
				sum += i * j; 
   		 }
		}
		return sum 
}
// fun3 的时间复杂度是 O(n * T(fun)) = O(n*n) ，即 O(n2) 
function fun3(n) {
    let sum = 0, i = 0;
    for(; i <= n; i++) {
        sum += fun(i);
    }
		return sum 
}
```



### 空间复杂度

> 表示算法的存储空间与数据规模之间的增长关系。

```js
// 执行空间为O(1+n)=O(n),即i及数组a所占的存储空间
function fun(n) {
    let a = [];
    for (let i = 0; i < n; i++) {
        a; 
}
```

## 1. js处理大数相加

> 由于js有精度问题，处理两个超过精度范围的数据相加，就会丢失精度;
> JS 中整数的最大安全范围可以查到是：9007199254740991  `(Math.pow(2, 53) - 1 )`

```js
// 需求：计算 9007199254740991 + 1234567899999999999
// 1. 准备两个字符串变量和一个方法
let a = '9007199254740991';
let b = '1234567899999999999';
function add(a, b) {
    // 2. 将字符串长度对齐 (使用0进行补位)
    let maxLength = Math.max(a.length, b.length);
    // padStart为头部补全
    a = a.padStart(maxLength, 0);
    b = b.padStart(maxLength, 0);
    // 3. 从各位开始相加
    // 定义加法过程中需要用到的变量
    let t = 0, f = 0, sum = ''; // t 同一位置相加的和； f 进位数
    for (let i = maxLength - 1; i >= 0; i--) {
        t = parseInt(a[i]) + parseInt(b[i]) + f;
        f = Math.floor(t/10);
        sum = t % 10 + sum; // 字符串拼接
    }
    if (f === 1) sum = '1' + sum;
    return sum;
}

add(a, b); // 1243575099254740990

 /*
 api介绍：
  str.padStart(targetLength,string)：使用指定字符串填充到目标字符串前面，使其达到目标长度；
  str.padEnd(targetLength,string)：使用指定字符串填充到目标字符串后面，使其达到目标长度；
  */
	/*
	最简单的方式是使用BigInt:
		let a = 9007199254740991n;
		let b = 1234567899999999999n;
		console.log(a + b); // 1243575099254740990n
	*/
```

**【可能使用场景】**

+ 服务端接口返回id长度超出js整数显示长度，需要处理溢出

  ```js
  let res = '{"id":1256007199254745450}';
  // 精度丢失
  console.log(res.id); // 1256007199254745600
  // json-bigint 配合axios处理
  import JsonBig from 'json-bigint';
  JsonBig.parse(this.res).value.toString(); // 有可能没有value方法，需要自己手动拼接
  ```

## 2. 两数之和

> 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标

```js
/*
示例: 
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
/* js进阶解法【参考】
*  @description
*  根据题意：一个数值不会超过2次，即传入的数组为无重复元素的数组
*  方法：使用Map记录索引位置, key => 数组成员，value => 成员对应索引
*  优势：使用map来解决双重for循环时间复杂度过高
*  */
var nums = [2, 7, 11, 15], target = 9;

var twoSum = function (nums, target) {
  // 使用map记录
  const getMap = () => {
    const valMap = new Map();
    nums.forEach((item, index) => valMap.set(item, index))
    return valMap;
  }
  const len = nums.length;
  // 传递参数数组长度校验
  if (len < 2) return [];
  if (len === 2) {
    if (nums[0] + nums[1] === target) {
      return [0, 1]
    } else {
      return []
    }
  }

  const valMap = getMap(nums);
  for (let i = 0; i < len; i++) {
    const left = target - nums[i];
    if (valMap.has(left)) { // 判断是否有值，从而间接获取另一个索引
      const targetIndex = valMap.get(left);
      if (targetIndex > i) {
        return [i, targetIndex];
      }
    }
  }
  return [];
};

// 解法2：优化map存储值
const twoSum = function(nums, target) {
  let map = new Map();
  for(let i = 0; i < nums.length; i++) {
    let k = target - nums[i];
    if(map.has(k)){
      return [map.get(k), i];
    }
    map.set(nums[i], i);
  }
}

//leetcode submit region end(Prohibit modification and deletion)
/* 我的解法 */
/*
var twoSum = function (nums, target) {
  let numsLen = nums.length;
  let targetArr = [];
  if (nums[0] + nums[1] === target) {
    targetArr.splice(0, 0, 0, 1);
    return targetArr;
  }
  for (var i = 0; i < numsLen - 1; i++) {
    for (var j = i + 1; j < numsLen; j++) {
      if (nums[i] + nums[j] === target) {
        targetArr.splice(0, 0, i, j);
        break;
      }
    }
  }
  return targetArr;
};*/

```

## 3. js实现字典树

> Trie Tree, 又称单词字典树、查找树，是一种树形结构，是一种哈希树的变种。典型应用是用于统计和排序大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。它的优点是：最大限度地减少无谓的字符串比较，查询效率比哈希表高

**性质**

+ 根节点不包含字符，除根节点外每一个节点都只包含一个字符
+ 从根节点到某一节点，路径上经过的字符连接起来，为该节点对应的字符串
+ 每个节点的所有子节点包含的字符都不相同

```js
//javascript实现字典树trie，简单的实现下
class TrieNode {
    constructor(value){
        this.value = value; //value为单个字符
        this.num=1;
        this.deep=0;//根节点默认0
        this.son=[];
        this.isEnd=false;
    }
    findNode(value){
        for(let i=0;i<this.son.length;i++){
            const node=this.son[i]
            if(node.value == value){
                return node;
            }
        }
        return null;
    }
}
class Trie {
    constructor(){
        this.root=new TrieNode(null);
        this.size=1;//一开始的时候只有根节点这一个节点
    }
    insert(str){
        let node=this.root;
        for(let c of str){
 
            let snode = node.findNode(c);
            if(snode==null){
                snode=new TrieNode(c)
                snode.deep=node.deep+1;
                node.son.push(snode);
            }else{
                snode.num++;//有N个字符串经过它
            }
            node=snode;
 
        }
        //如果当前的node已经是一个word，则不需要添加
        if (!node.isEnd) {
            this.size++;
            node.isEnd = true;
        }
    }
    has(str){
        let node=this.root;
        for(let c of str){
            const snode=node.findNode(c)
            if(snode){
                node=snode;
            }else{
                return false;
            }
        }
        return node.isEnd;
    }
}
 
//demo
const nt=new Trie()
nt.insert('name');
nt.insert('word');
nt.insert('happy');
nt.insert('trie');
 
// console.log(nt.root['d'])
console.log(nt.has('has'))
console.log(nt.has('trie'))
console.log(nt.has('word'))

```

## 4. 合并两个有序数组

> 给你两个有序整数数组 nums1 和 nums2 ，请你将 nums2 合并到 nums1 中，使 num1 成为一个有序数组
>
> 说明:
>
> 初始化 nums1 和 nums2 的元素数􏰀分别为 m 和 n 。 你可以假设 nums1 有足够的空间(空间 大小大于或等于 m + n )来保存 nums2 中的元素

```text
// 示例
 
输入:
nums1 = [1,2,3,0,0,0], m = 3 nums2 = [2,5,6], n = 3
输出: [1,2,2,3,5,6]
```

**解题思路**

- <img src="/Users/guojiguang/Documents/devRecord/typora_not/images/algorithm/4_sort_arr.png" alt="avatar" style="zoom:67%;" />

+ nums1 、 nums2 有序，若把 nums2 全部合并到 nums1 ，则合并后的 nums1 ⻓度为 m+n
+ 我们可以从下标 m+n-1 的位置填充 nums1 ，比较 nums1[len1] 与 nums2[len2] 的大 小，将最大值写入 nums1[len] ，即
  + nums1[len1]>=nums2[len2] ， nums1[len--] = nums1[len1--] ,这里 -- 是因为 写入成功后，下标自动建议，继续往前比较
  +  否则 nums1[len--] = nums2[len2--]

+ 边界条件：
  + 若 len1 < 0 ，即 len2 >= 0 ，此时 nums1 已􏰂写入， nums2 还未合并完，仅仅 需要将 nums2 的剩余元素(0...len)写入 nums2 即可，写入后，合并完成
  + 若 len2 < 0 ，此时 nums2 已全部合并到 nums1 ，合并完成

```js
// 时间复杂度(m+n)
const merge = function(nums1, m, nums2, n) {
  let len1 = m - 1,
      len2 = n -1,
      len = m+ n -1;
  while(len2 >= 0) {
    if(len1 < 0) {
      nums1[len--] = nums2[len2--];
      continue;
    }
    nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--];
  }
}
```

## 5. 手写数组去重、扁平化函数、排序

> 已知如下数组:var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
>
> 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

```js
// api实现
// 扁平化
const flattenDeep = (arr) => arr.flat(Infinity);
// 去重
const unique = (arr) => Array.from(new Set(arr));
// 排序
const sort = (arr) => arr.sort((a, b) => a-b);
// 函数合并
const compose = (...fns) => (initValue) => fns.reduceRight((y, fn) => fn(y), initValue);
// 组合后函数
cosnt flatten_unique_sort = compose(sort, unique, flattenDeep);
// 测试
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]
console.log(flatten_unique_sort(arr))
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

// 方法一：reduce方法实现扁平化
function flattenDeep(arr) {
  return Array.isArray(arr) ? arr.reducer( (acc, cur) => [...acc, ...flattenDeep(cur)], []) : [arr]
}

// 方法二：栈
function flattenDeep(arr) {
  const result = [];
  // 将数组元素拷贝到栈，直接赋值会改变原数组
  const stack = [...arr];
  // 如果栈不为空，则循环遍历
  while (stack.length !== 0) {
    const val = stack.pop();
    if(Array.isArray(val)) {
      // 如果是数组再次入栈，并且展开一层
      stack.push(...val);
    } else {
      // 如果不是数组，就用头插法到结果数组中
      result.unshift(val);
    }
  }
  return result;
}
```

## 6. 编写一个函数计算多个数组的交集

> **要求**：输出结果中每个元素一定是唯一的

```js
const intersection = function(...args) {
  if(args.length === 0) {
    return []
  }
  if(args.length === 1) {
    return [0]
  }
  return [...newSet(args.reduce(result, arg)=> {
    return result.filter(item => arg.includes(item))
  },[]))];
}
```

## 7. 设计和实现一个**LRU**(最近最少使用)缓存机制

> 运用你所掌握的数据结构，设计和实现一个 LRU (最近最少使用) 缓存机制。它应该支持以下操作: 获取数据 get 和写入数据 put 

```js
// 数组+对象实现
var LRUCache = function(capacity) {
  this.keys = []
  this.cache = Object.create(null)
  this.capcity = capacity
};

LRUCache.prototype.get = function(key) {
  if(this.cache[key]){
    // 调整位置
    remove(this.keys, key)
    this.keys.push(key)
    return this.cache[key]
  }
  return -1
};

LRUCache.prototype.put = function(key, value) {
  if(this.cache[key]) {
    // 存在即更新
    this.cache[key] = value
    remove(this.keys, key)
    this.keys.push(key)
  } else {
    // 不存在即加入
    this.keys.push(key)
    this.cache[key] = value
    // 判断缓存是否已超过最大值
    if(this.keys.length > this.capacity) {
      removeCache(this.cache, this.keys, this.keys[0])
    }
  }
};

// 移除key
function remove(arr, key) {
  if(arr.length) {
    const index = arr.indexOf(key)
    if(index > -1) {
      return arr.splice(index, 1)
    }
  }
}

// 移除缓存中key
function removeCache(cache, keys, key) {
  cache[key] = null;
  remove(keys, key);
}
```

> 进阶：Map
>
> 利用Map既能保存键值对，也可以记住键的原始插入顺序

```js
var LRUCache = function(capacity) {
  this.cache = new Map()
  this.capacity = capacity
}

LRUCache.prototype.get = function(key) {
  if(this.cache.has(key)) {
    // 存在即更新
    let temp = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, temp)
  }
  return -1
}

LRUCache.prototype.put = function(key, value) {
  if(this.cache.has(key)) {
    this.cache.delete(key)
  } else if (this.cache.size >= this.capacity) {
    // 不存在即加入
    // 缓存超过最大值，则移除最近没有使用的
    this.cache.delete(this.cache.keys().next().value)
  }
  this.cache.set(key, value)
}
```

## 8. 最小栈

> 设计一个支持push, pop, top操作，并能在常数内检测到最小元素的栈

```js
const MinStack = function() {
  this.items = []
  this.min = null
};

// 进栈
MinStack.prototype.push = function(x) {
  if(!this.items.length) this.min = x
  this.min = Math.min(x, this.min)
  this.items.push(x)
};

// 出栈
MinStack.prototype.pop = function() {
  let num = this.items.pop()
  this.min = Math.min(...this.items)
  return num
}

// 获取栈顶元素
MinStack.prototype.top = function() {
  if(!this.items.length) return null
  return this.items[this.items.length - 1]
};

// 检索栈中的最小元素
MinStack.prototype.getMin = function() {
  return this.min
};
```

## 9. 删除字符串中所有相邻重复项

> 给出由小写字母组成的字符串 S ，重复项删除操作 会选择两个相邻且相同的字母，并删除它们。 在 S 上反复执行􏰂复项删除操作，直到无法继续删除

**解题思路**：遍历字符串，依次入栈，入栈时判断与栈头元素是否一致，若一致，即这两个元素相同相邻，则需要将栈头元素出栈，并且当前元素也无需入栈

**解题步骤**：遍历字符串，取出栈头字符，帕努单当前字符与栈头字符是否一致

+ 不一致，栈头字符进栈，当前字符进栈
+ 一致，即栈头字符与当前字符相同相邻，都不需要进栈，直接进入下次遍历即可

```js
const removeDuplicates = function(S) {
  let stack = [];
  for(c of S) {
    let prev = stack.pop();
    if(prev !==c) {
      stack.push(prev)
      stack.push(c)
    }
  }
  return stack.join('')
}
```

## 10. 翻转字符串里的单词

> 给定一个字符串，逐个翻转字符串中的每个单词

```tex
示例1：
输入: "the sky is blue"
输出: "blue is sky the"

示例2：
输入: " hello world! "
输出: "world! hello"
解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。

输入: "a good example"
输出: "example good a"
解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
```

**说明**：

+ 无空格字符构成一个单词
+ 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括
+ 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。

**解题思路**：使用双端队列解题

+ 首先去除字符串左右空格
+ 逐个读取字符串中的每个单词，一次放入双端队列的对头
+ 再将队列转换成字符串输出（以空格为分隔符）

**图解**

<img src="/Users/guojiguang/Documents/devRecord/typora_not/images/algorithm/double_queue.png" alt="avatar" style="zoom:80%;" />

```js
const reverseWords = function(s) {
  let left = 0
  let right = s.length - 1
  let queue = []
  let word = ''
  while (s.chartAt(left) === ' ') left ++
  while (s.chartAt(right) === ' ') right --
  while (left <= right) {
    let char = s.charAt(left)
    if(char === ' ' && word) {
      queue.unshift(word)
      word = ''
    }else if (char !== ' '){
      word += char
    }
    left++
  }
  queue.unshift(word)
  return queue.join(' ')
}
```

## 11. 无重复字符的最长子串

> 给定一个字符串，找出其中不含重复字符的最长子串的长度

**解题思路**:使用一个数组来维护滑动窗口

遍历字符串，判断字符是否在滑动窗口数组里

+ 不在则push进数组
+ 在则删除滑动窗口数组里面相同字符及相同字符前的字符，然后将当前字符push进数组
+ 然后将max更新为当前最长子串的长度

**图解**

<img src="/Users/guojiguang/Documents/devRecord/typora_not/images/algorithm/max_string.png" alt="avatar" style="zoom:80%;" />

```js
const lengthOfLongestSubstring = function(s) {
  let arr = [], max = 0;
  for(let i = 0; i< s.length; i++) {
    let index = arr.indexOf(s[i])
    if(index !== -1) {
      arr.splice(0, index + 1);
    }
    arr.push(s.charAt(i));
    max = Math.max(arr.length, max)
  }
  return max
}
```

## 12. 滑动窗口最大值问题

> 滑动窗口： 滑动窗口就是一个运行在一个大数组上的子列表，该数组是一个底层元素集合。 假设有数组 [a b c d e f g h ]，一个大小为 3 的 滑动窗口在其上滑动，则有
>
> ```tex
> [a b c] 
>   [b c d]
>     [c d e]
>       [d e f]
>         [e f g]
>           [f g h]
> ```

>给定一个数组`nums`和滑动窗口的大小k，请找出所有滑动窗口里的最大值

**示例**

```tex
 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 
 输出: [3,3,5,5,6,7]
```

**解题思路**：使用一个双端队列存储窗口中的索引，并保证双端队列中第一个元素永远是最大值，则只需要遍历一次nums，就可以取到每次移动时的最大值。

+ 比较当前元素i和双端队列第一个元素（索引值），相差 >= k 时队首出列
+ 依次比较双端队列的队尾和当前元素i对应的值，队尾元素值较小时出列，直至不小于当前元素i的值时，或者队列为空，这是为了保证当队头出队时，新的队头依旧是最大值
+ 当前元素入队
+ 从第 K 次遍历开始，依次把最大值(双端队列的队头)添加到结果 result 中

```js
const maxSlidingWindow = function(nums, k) {
  const deque = []
  const result = []
  for (let i = 0; i< nums.length; i++) {
    if(i - deque[0] >= k) {
      deque.shift()
    }
    while(nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop()
    }
    deque.push(i)
    if(i >= k -1) {
      result.push(nums[deque[0]])
    }
  }
  return result
}
```

## 13. 第一个只出现一次的字符

> 在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母

**示例**

```tex
s = "abaccdeff" 返回 "b"
s = "" 返回 " "
```

**限制**

`0 <= s的长度 <= 5000`

**解题思路**：使用map遍历记录所有字符的次数，比较次数得出收个字符

+ 遍历字符串，将每个字符的值与出现次数记录到map中
+ 再次遍历map.keys()，获取map中每个字符出现的次数，判断是否仅仅只有1次，返回第一个仅出现一次的字符

```js
const firstUniqChar = function(s) {
  if(!s) return ' ';
  let map = new Map();
  for(let c of s) {
    if(map.has(c)){
      map.set(c, map.get(c) + 1);
    }else{
      map.set(c, 1);
    }
  }
  for(let c of map.keys()){
    if(map.get(c)===1){
      return c
    }
  }
  return ' '
}
```



