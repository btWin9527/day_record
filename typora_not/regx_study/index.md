# js正则表达式

> [参考链接](https://juejin.cn/post/6844903487155732494#heading-0)

## 1. 字符匹配

> 正则表达式即匹配模式，匹配**字符**或**匹配**位置

### 1.1 两种模糊匹配

**横向模糊匹配**

> 一个正则匹配的字符串的长度不固定
>
> 实现方式： {m,n}		(连续出现最少m次，最多n次)

```js
var regx = /ab{2,5}c/g;
var string = "abc abbc abbbc abbbbc abbbbbc abbbbbbc";
string.match(regex); // ["abbc", "abbbc", "abbbbc", "abbbbbc"]
```



**纵向模糊匹配**

> 正则匹配的字符串，具体到某一个字符时，可以不是某个确定的字符，可能有多种情况
>
> 实现方式： /a[123]b/  (匹配字符为a1b,a2b,a3b)

```js
var regex = /a[123]b/g;
var string = "a0b a1b a2b a3b a4b";
string.match(regx); // ["a1b", "a2b", "a3b"]
```



### 1.2 字符组

**范围表示法**

> 使用**[]**配合**-**连字符来标识范围
>
> 若需要单独匹配- ，使用`[-az]` 或 `[az-]` 或 `[a\-z]`

```js
// 匹配1-6a-f
var reg = /[1-6a-f]/;

```



**排除字符组**

> 纵向模糊匹配，如`[^abc]`表示一个除'a','b','c'职位的任意一个字符，^表示为取反

```text
\d 			[0-9]							一位数字
\D			[^0-9]						除数字外任意字符
\w			[0-9a-zA-Z_]			数字、大小写字母和下划线
\W			[^0-9a-zA-Z_]			非单词字符
\s			[\t\v\n\r\f]			空白字符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符
\S			[^\t\v\n\r\f]			非空白字符
.				[^\n\r\u2028\u2029]通配符，换行符、回车符、行分隔符和段分隔符除外

```



### 1.3 量词

> 量词也称重复, {m, n}

```text
{m,} 	至少出现m次
{m}   出现m次
?			{0,1} 出现或者不出现
+			{1,}  出现至少1次
*			{0,}	出现任意次，有可能不出现
```

**贪婪匹配和惰性匹配**

> 正则`/\d{2,5}/`，表示数字连续出现2到5次。会匹配2位、3位、4位、5位连续数字 【贪婪模式】
>
> `/\d{2,5}?/`表示，虽然2到5次都行，当2个就够的时候，就不在往下尝试了	【惰性模式】

```js
var regx = /\d{2,5}/g;
var string = "123 1234 12345 123456";
console.log(string.match(regx));
// => ["123", "1234", "12345", "12345"]

var regx = /\d{2,5}?/g;
var string = "123 1234 12345 123456";
console.log(string.match(regx));
// => ["12", "12", "34", "12", "34", "12", "34", "56"]
```

### 1.4 多选分支

> 使用 | 分割多个匹配规则

```js
// 多选分支匹配属于惰性匹配
var regex = /good|goodbye/g;
var string = "goodbye";
console.log( string.match(regex) ); 
// => ["good"]

var regex = /goodbye|good/g;
var string = "goodbye";
console.log( string.match(regex) ); 
// => ["goodbye"]
```

### 1.5 案例

**匹配十六进制颜色值**

1. #开头，包含数字，字母大小写 (a~f)
2. 字符可以出现3或者6次 （#ffffff可以简写为#fff）

```js
var regx = /#([0-9a-fA-F]{3})|([0-9a-fA-F]{6})/g;
var string = "#ffbbad #Fc01DF #FFF #ffE";
console.log( string.match(regex) ); 
// => ["#ffbbad", "#Fc01DF", "#FFF", "#ffE"]
```

**匹配时间**

>要求匹配  24小时制

1. 第一位为2，第二位为`[0-3]`
2. 第一位为0或1，第二位为 `[0-9]`
3. 第三位为`[0-5]`，第四位为`[0-9]`

```js
var regx = /^([01][0-9]|[2][0-3]):[0-5][0-9]$/;
```

**匹配id**

> 要求从 `<div id="test" class="main"></div>`

```js
var regex = /id="[^'']*"/;
var string = '<div id="container" class="main"></div>';
console.log(string.match(regex)[0]); 
// => id="container"
```

## 2. 位置匹配

> `^ $ \b \B (?=p) (?!p)`		锚字符

### 2.1 ^和$



### 2.2 \b 和 \B



