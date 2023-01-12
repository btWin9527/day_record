# 前端规范

## 1. HTML规范

### 1.1 代码规范

#### 1.1.1 元素及标签闭合

+ 所有具有开始标签和结束标签的元素都要写上起止标签，某些允许省略开始标签或和束标签的元素亦都要写上。
+ 空元素标签都不加 “/” 字符

**推荐**

```html
<div>
    <h1>我是h1标题</h1>
    <p>我是一段文字，我有始有终，浏览器能正确解析</p>
</div>

<br>
```

**不推荐**

```html
<div>
    <h1>我是h1标题</h1>
    <p>我是一段文字，我有始无终，浏览器亦能正确解析
</div>

<br/>
```

#### 1.1.2 HTML代码大小写

**推荐**

```html
<div class="demo"></div>
```

**不推荐**

```html
<div class="DEMO"></div>
<DIV CLASS="DEMO"></DIV>
```

#### 1.1.3 元素属性

+ 元素属性值使用双引号语法
+ 元素属性值可以写上的都写上

**推荐**

```html
<input type="text">

<input type="radio" name="name" checked="checked">
```

**不推荐**

```html
<input type=text>
<input type='text'>

<input type="radio" name="name" checked>
```

#### 1.1.4 转移字符

在 HTML 中不能使用小于号 “<” 和大于号 “>”特殊字符，浏览器会将它们作为标签解析，
若要正确显示，在 HTML 源代码中使用字符实体

**推荐**

```html
<a href="#">more&gt;&gt;</a>
```

**不推荐**

```html
<a href="#">more>></a>
```

#### 1.1.5 代码缩进

统一使用四个空格进行代码缩进，使得各编辑器表现一致（各编辑器有相关配置）

```html
<div class="jdc">
    <a href="#"></a>
</div>
```

#### 1.1.6 代码嵌套

元素嵌套规范，每个块状元素独立一行，内联元素可选

**推荐**

```html
<div>
    <h1></h1>
    <p></p>
</div>
<p><span></span><span></span></p>
```

**不推荐**

```html
<div>
    <h1></h1><p></p>
</div>
<p>
    <span></span>
    <span></span>
</p>
```

段落元素与标题元素只能嵌套内联元素

**推荐**

```html
<h1><span></span></h1>
<p><span></span><span></span></p>
```

**不推荐**

```html
<h1><div></div></h1>
<p><div></div><div></div></p>
```


### 1.2 注释规范

#### 1.2.1 单行注释

一般用于简单的描述，如某些状态描述、属性描述等
注释内容前后各一个空格字符，注释位于要注释代码的上面，单独占一行

**推荐**

```html
<!-- Comment Text -->
<div>...</div>
```

**不推荐**

```html
<div>...</div><!-- Comment Text -->

<div><!-- Comment Text -->
    ...
</div>
```

#### 1.2.2 模块注释

一般用于描述模块的名称以及模块开始与结束的位置

注释内容前后各一个空格字符，
`<!-- S Comment Text -->` 表示模块开始，`<!-- E Comment Text -->` 表示模块结束，
模块与模块之间相隔一行

**推荐**

```html
<!-- S Comment Text A -->
<div class="mod_a">
    ...
</div>
<!-- E Comment Text A -->

<!-- S Comment Text B -->
<div class="mod_b">
    ...
</div>
<!-- E Comment Text B -->
```

**不推荐**

```html
<!-- S Comment Text A -->
<div class="mod_a">
    ...
</div>
<!-- E Comment Text A -->
<!-- S Comment Text B -->
<div class="mod_b">
    ...
</div>
<!-- E Comment Text B -->

```

#### 1.2.3 嵌套模块注释

当模块注释内再出现模块注释的时候，为了突出主要模块，嵌套模块不再只使用模块注释,改用

```html
<!-- /Comment Text -->
```

**推荐**

```html
<!-- S Comment Text A -->
<div class="mod_a">

    <div class="mod_b">
        ...
    </div>
    <!-- /mod_b -->

    <div class="mod_c">
        ...
    </div>
    <!-- /mod_c -->

</div>
<!-- E Comment Text A -->
```

## 2. CSS规范

### 2.1 代码规范

#### 2.1.1 代码大小写

样式选择器，属性名，属性值关键字全部使用小写字母书写，属性字符串允许使用大小写

```css
/* 推荐 */
.jdc{
	display:block;
}
	
/* 不推荐 */
.JDC{
	DISPLAY:BLOCK;
}
```

#### 2.1.2 选择器

- 尽量少用通用选择器 `*`
- 不使用 ID 选择器
- 不使用无具体语义定义的标签选择器

```css
/* 推荐 */
.jdc {}
.jdc li {}
.jdc li p{}

/* 不推荐 */
*{}
#jdc {}
.jdc div{}
```

#### 2.1.3 代码可读性

属性值十六进制数值能用简写的尽量用简写

**推荐**

```css
.jdc {
    color: #fff;
}
```

**不推荐**

```css
.jdc {
    color: #ffffff;
}
```



不要为 `0` 指明单位

**推荐**

```css
.jdc {
    margin: 0 10px;
}
```

**不推荐**

```css
.jdc {
    margin: 0px 10px;
}
```

#### 2.1.4 属性值引号

css属性值需要用到引号时，统一使用单引号

```css
/* 推荐 */
.jdc { 
	font-family: 'Hiragino Sans GB';
}

/* 不推荐 */
.jdc { 
	font-family: "Hiragino Sans GB";
}
```

#### 2.1.5 属性书写顺序

建议遵循以下顺序：

1. 布局定位属性：display / position / float / clear / visibility / overflow
2. 自身属性：width / height / margin / padding / border / background
3. 文本属性：color / font / text-decoration / text-align / vertical-align / white- space / break-word
4. 其他属性（CSS3）：content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient …

```css
.jdc {
    display: block;
    position: relative;
    float: left;
    width: 100px;
    height: 100px;
    margin: 0 10px;
    padding: 20px 0;
    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
    color: #333;
    background: rgba(0,0,0,.5);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;
    -ms-border-radius: 10px;
    border-radius: 10px;
}
```

#### 2.1.6 css3浏览器私有前缀（使用项目配置自动添加）

CSS3 浏览器私有前缀在前，标准前缀在后

```css
.jdc {
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;
    -ms-border-radius: 10px;
    border-radius: 10px;
}
```

### 2.2 注释规范

- 注释以字符 `/*` 开始，以字符 `*/` 结束
- 注释不能嵌套

```css
/*Comment Text*/
```

#### 2.2.1 单行注释

注释内容第一个字符和最后一个字符都是一个空格字符，单独占一行，行与行之间相隔一行

**推荐**

```css
/* Comment Text */
.jdc{}

/* Comment Text */
.jdc{}
```

**不推荐**

```css
/*Comment Text*/
.jdc{
	display: block;
}
.jdc{
	display: block;/*Comment Text*/
}
```

#### 2.2.2 模块注释

注释内容第一个字符和最后一个字符都是一个空格字符，`/*` 与 模块信息描述占一行，多个横线分隔符`-`与`*/`占一行，行与行之间相隔两行

**推荐**

```css
/* Module A
---------------------------------------------------------------- */
.mod_a {}


/* Module B
---------------------------------------------------------------- */
.mod_b {}
```

**不推荐**

```css
/* Module A ---------------------------------------------------- */
.mod_a {}
/* Module B ---------------------------------------------------- */
.mod_b {}
```

#### 2.2.3 文件信息注释

在样式文件编码声明 `@charset` 语句下面注明页面名称、作者、创建日期等信息

```css
@charset "UTF-8";
/**
 * @desc File Info
 * @author Author Name
 * @date 2015-10-10
 */
```

### 2.3 sass规范

SASS有两种语法格式，一种是 SCSS (Sassy CSS)，另一种是缩进格式（Indented Syntax），有时称之为 Sass。

考虑到 SCSS 语法对 CSS 语法友好的兼容性和扩展性，我们在使用 SASS 编写样式的时候，统一使用 SCSS 语法

#### 2.3.1 注释规范

- 全部遵循 CSS 注释规范
- 不使用 `/*! */` 注释方式
- 注释内不放 SASS 变量

```scss
@charset "UTF-8";

/**
 * @desc File Info
 * @author liqinuo
 * @date 2015-10-10
 */

/* Module A
----------------------------------------------------------------*/
.mod_a {}

/* module A logo */
.mod_a_logo {}

/* module A nav */
.mod_a_nav {}


/* Module B
----------------------------------------------------------------*/
.mod_b {}

/* module B logo */
.mod_b_logo {}

/* module B nav */
.mod_b_nav {}
```

#### 2.3.2 嵌套规范

**选择器嵌套**

```scss
/* CSS */
.jdc {}
body .jdc {}

/* SCSS */
.jdc {
    body & {}
}

```

最多嵌套**四层**

```scss
/* CSS */
.jdc {}
.jdc_cover {}
.jdc_info {}
.jdc_info_name {}

/* SCSS */
.jdc {
    &_cover {}
    &_info {
        &_name {}
    }
}
```

**属性嵌套**

```scss
/* CSS */
.jdc {
    background-color: red;
    background-repeat: no-repeat;
    background-image: url(/img/icon.png);
    background-position: 0 0;
}

/* SCSS */
.jdc {
    background: {
        color: red;
        repeat: no-repeat;
        image: url(/img/icon.png);
        position: 0 0;
    }
}
```

#### 2.3.3 变量

可复用属性尽量抽离为页面变量，易于统一维护

```scss
// CSS
.jdc {
    color: red;
    border-color: red;
}

// SCSS
$color: red;
.jdc {
    color: $color;
    border-color: $color;
}
```

#### 2.3.4 混合(mixin)

根据功能定义模块，然后在需要使用的地方通过 `@include` 调用，避免编码时重复输入代码段

```scss
// CSS
.jdc_1 {
    -webkit-border-radius: 5px;
    border-radius: 5px;
}
.jdc_2 {
    -webkit-border-radius: 10px;
    border-radius: 10px;
}

// SCSS
@mixin radius($radius:5px) {
    -webkit-border-radius: $radius;
    border-radius: $radius;
}
.jdc_1 {
    @include radius; //参数使用默认值
}
.jdc_2 {
    @include radius(10px);
}



// CSS
.jdc_1 {
    background: url(/img/icon.png) no-repeat -10px 0;
}
.jdc_2 {
    background: url(/img/icon.png) no-repeat -20px 0;
}

// SCSS
@mixin icon($x:0, $y:0) {
    background: url(/img/icon.png) no-repeat $x, $y;
}
.jdc_1 {
    @include icon(-10px, 0);
}
.jdc_2 {
    @include icon(-20px, 0);
}
```

#### 2.3.5 extend 继承

```scss
// CSS
.jdc_1 {
    font-size: 12px;
    color: red;
}
.jdc_2 {
    font-size: 12px;
    color: red;
    font-weight: bold;
}

// SCSS
.jdc_1 {
    font-size: 12px;
    color: red;
}
.jdc_2 {
    @extend .jdc_1;
    font-weight: bold;
}
```

#### 2.3.6 function函数

```scss
@function pxToRem($px) {
    @return $px / 10px * 1rem;
}
.jdc {
    font-size: pxToRem(12px);
}
```



### 2.4 重置样式

#### 2.4.1 pc端

```css
html, body, div, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, ul, li, fieldset, form, label, input, legend, table, caption, tbody, tfoot, thead, tr, th, td, textarea, article, aside, audio, canvas, figure, footer, header, mark, menu, nav, section, time, video { margin: 0; padding: 0; }
h1, h2, h3, h4, h5, h6 { font-size: 100%; font-weight: normal }
article, aside, dialog, figure, footer, header, hgroup, nav, section, blockquote { display: block; }
ul, ol { list-style: none; }
img { border: 0 none; vertical-align: top; }
blockquote, q { quotes: none; }
blockquote:before, blockquote:after, q:before, q:after { content: none; }
table { border-collapse: collapse; border-spacing: 0; }
strong, em, i { font-style: normal; font-weight: normal; }
ins { text-decoration: underline; }
del { text-decoration: line-through; }
mark { background: none; }
input::-ms-clear { display: none !important; }
body { font: 12px/1.5 \5FAE\8F6F\96C5\9ED1, \5B8B\4F53, "Hiragino Sans GB", STHeiti, "WenQuanYi Micro Hei", "Droid Sans Fallback", SimSun, sans-serif; background: #fff; }
a { text-decoration: none; color: #333; }
a:hover { text-decoration: underline; }
```

#### 2.4.2 移动端

```css
* { -webkit-tap-highlight-color: transparent; outline: 0; margin: 0; padding: 0; vertical-align: baseline; }
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin: 0; padding: 0; vertical-align: baseline; }
img { border: 0 none; vertical-align: top; }
i, em { font-style: normal; }
ol, ul { list-style: none; }
input, select, button, h1, h2, h3, h4, h5, h6 { font-size: 100%; font-family: inherit; }
table { border-collapse: collapse; border-spacing: 0; }
a { text-decoration: none; color: #666; }
body { margin: 0 auto; min-width: 320px; max-width: 640px; height: 100%; font-size: 14px; font-family: -apple-system,Helvetica,sans-serif; line-height: 1.5; color: #666; -webkit-text-size-adjust: 100% !important; text-size-adjust: 100% !important; }
input[type="text"], textarea { -webkit-appearance: none; -moz-appearance: none; appearance: none; }
```

### 2.5 媒体查询

#### 2.5.1 横竖屏

```css
/* 横屏 */
@media all and (orientation :landscape) {

} 

/* 竖屏 */
@media all and (orientation :portrait) {

}
```

#### 2.5.2 设备宽高

```css
/* 设备宽度大于 320px 小于 640px */
@media all and (min-width:320px) and (max-width:640px) {
    
}
```

#### 2.5.3 常用设备

```css
/* ----------- iPhone 6 ----------- */

/* Portrait and Landscape */
@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 

}

/* Portrait */
@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: portrait) { 

}

/* Landscape */
@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: landscape) { 

}

/* ----------- iPad mini ----------- */

/* Portrait and Landscape */
@media only screen 
  and (min-device-width: 768px) 
  and (max-device-width: 1024px) 
  and (-webkit-min-device-pixel-ratio: 1) {

}

/* Portrait */
@media only screen 
  and (min-device-width: 768px) 
  and (max-device-width: 1024px) 
  and (orientation: portrait) 
  and (-webkit-min-device-pixel-ratio: 1) {

}

/* Landscape */
@media only screen 
  and (min-device-width: 768px) 
  and (max-device-width: 1024px) 
  and (orientation: landscape) 
  and (-webkit-min-device-pixel-ratio: 1) {

}
```

### 2.6 移动端私有属性

#### 2.6.1 -webkit-scrollbar (滚动条)

`-webkit-scrollbar` 是-webkit-私有的伪元素，用于对拥有overflow属性的区域 **自定义滚动条的样式**。

譬如，为了隐藏滚动条，你可以这么做:

```css
.scroll::-webkit-scrollbar {
    width: 0;
    height: 0;
}
```

#### 2.6.2 -webkit-user-select(用户是否能选中元素)

定义用户是否能选中元素内容

**属性值**

- `auto`：可选中元素内容
- `none`：不能选中任何内容
- `text`：可选中元素内的文本

**兼容性**

- iOS 3.0 及更高版本的 Safari
- 大部分安卓手机

### 2.7 className命名规范

ClassName的命名应该尽量精短、明确，必须以**字母开头命名**，且**全部字母为小写**，单词之间**统一使用下划线** “_” 连接

### 2.7.1 命名原则

基于姓氏命名法（继承 + 外来）,祖先模块不能出现下划线，除了是全站公用模块，如 `mod_` 系列的命名

**推荐**

```html
<div class="modulename">
	<div class="modulename_info">
		<div class="modulename_son"></div>
		<div class="modulename_son"></div>
		...
	</div>
</div>
	
<!-- 这个是全站公用模块，祖先模块允许直接出现下划线 -->
<div class="mod_info">
	<div class="mod_info_son"></div>
	<div class="mod_info_son"></div>
	...		
</div>
```

**不推荐**

```html
<div class="modulename_info">
	<div class="modulename_info_son"></div>
	<div class="modulename_info_son"></div>
	...		
</div>
```



在子孙模块数量可预测的情况下，严格继承祖先模块的命名前缀

```html
<div class="modulename">
	<div class="modulename_cover"></div>
	<div class="modulename_info"></div>
</div>
```

**推荐**

```html
<div class="modulename">
	<div class="modulename_cover"></div>
	<div class="modulename_info">
    	<div class="modulename_info_user">
    		<div class="modulename_info_user_img">
    			<img src="" alt="">
    			<!-- 这个时候 miui 为 modulename_info_user_img 首字母缩写-->
    			<div class="miui_tit"></div>
    			<div class="miui_txt"></div>
    			...
    		</div>
    	</div>
    	<div class="modulename_info_list"></div>
	</div>
</div>
```

**不推荐**

```html
<div class="modulename">
	<div class="modulename_cover"></div>
	<div class="modulename_info">
    	<div class="modulename_info_user">
    		<div class="modulename_info_user_img">
    			<img src="" alt="">
    			<div class="modulename_info_user_img_tit"></div>
    			<div class="modulename_info_user_img_txt"></div>
    			...
    		</div>
    	</div>
    	<div class="modulename_info_list"></div>
	</div>
</div>
```

### 2.7.2 模块命名

全站公共模块：以 `mod_` 开头

```html
<div class="mod_yours"></div>
```

业务公共模块：以 `业务名_mod_` 开头

```html
<div class="paipai_mod_yours"></div>
```

### 2.7.3 命名推荐

**注意**：ad、banner、gg、guanggao 等有机会和广告挂勾的字眠不建议直接用来做ClassName，因为有些浏览器插件（Chrome的广告拦截插件等）会直接过滤这些类名

这种广告的英文或拼音类名不应该出现另外，**敏感不和谐字眼**也不应该出现，如：

```html
<div class="ad"></div>

<div class="fuck"></div>
<div class="jer"></div>
<div class="sm"></div>
<div class="gcd"></div> 
<div class="ass"></div> 
<div class="KMT"></div> 
```

推荐使用的命名单词：

| ClassName              | 含义                   |
|:-----------------------|:---------------------|
| about                  | 关于                   |
| account                | 账户                   |
| arrow                  | 箭头图标                 |
| article                | 文章                   |
| aside                  | 边栏                   |
| audio                  | 音频                   |
| avatar                 | 头像                   |
| bg,background          | 背景                   |
| bar                    | 栏（工具类）               |
| branding               | 品牌化                  |
| crumb,breadcrumbs      | 面包屑                  |
| btn,button             | 按钮                   |
| caption                | 标题，说明                |
| category               | 分类                   |
| chart                  | 图表                   |
| clearfix               | 清除浮动                 |
| close                  | 关闭                   |
| col,column             | 列                    |
| comment                | 评论                   |
| community              | 社区                   |
| container              | 容器                   |
| content                | 内容                   |
| copyright              | 版权                   |
| current                | 当前态，选中态              |
| default                | 默认                   |
| description            | 描述                   |
| details                | 细节                   |
| disabled               | 不可用                  |
| entry                  | 文章，博文                |
| error                  | 错误                   |
| even                   | 偶数，常用于多行列表或表格中       |
| fail                   | 失败（提示）               |
| feature                | 专题                   |
| fewer                  | 收起                   |
| field                  | 用于表单的输入区域            |
| figure                 | 图                    |
| filter                 | 筛选                   |
| first                  | 第一个，常用于列表中           |
| footer                 | 页脚                   |
| forum                  | 论坛                   |
| gallery                | 画廊                   |
| group                  | 模块，清除浮动              |
| header                 | 页头                   |
| help                   | 帮助                   |
| hide                   | 隐藏                   |
| hightlight             | 高亮                   |
| home                   | 主页                   |
| icon                   | 图标                   |
| info,information       | 信息                   |
| last                   | 最后一个，常用于列表中          |
| links                  | 链接                   |
| login                  | 登录                   |
| logout                 | 退出                   |
| logo                   | 标志                   |
| main                   | 主体                   |
| menu                   | 菜单                   |
| meta                   | 作者、更新时间等信息栏，一般位于标题之下 |
| module                 | 模块                   |
| more                   | 更多（展开）               |
| msg,message            | 消息                   |
| nav,navigation         | 导航                   |
| next                   | 下一页                  |
| nub                    | 小块                   |
| odd                    | 奇数，常用于多行列表或表格中       |
| off                    | 鼠标离开                 |
| on                     | 鼠标移过                 |
| output                 | 输出                   |
| pagination             | 分页                   |
| pop,popup              | 弹窗                   |
| preview                | 预览                   |
| previous               | 上一页                  |
| primary                | 主要                   |
| progress               | 进度条                  |
| promotion              | 促销                   |
| rcommd,recommendations | 推荐                   |
| reg,register           | 注册                   |
| save                   | 保存                   |
| search                 | 搜索                   |
| secondary              | 次要                   |
| section                | 区块                   |
| selected               | 已选                   |
| share                  | 分享                   |
| show                   | 显示                   |
| sidebar                | 边栏，侧栏                |
| slide                  | 幻灯片，图片切换             |
| sort                   | 排序                   |
| sub                    | 次级的，子级的              |
| submit                 | 提交                   |
| subscribe              | 订阅                   |
| subtitle               | 副标题                  |
| success                | 成功（提示）               |
| summary                | 摘要                   |
| tab                    | 标签页                  |
| table                  | 表格                   |
| txt,text               | 文本                   |
| thumbnail              | 缩略图                  |
| time                   | 时间                   |
| tips                   | 提示                   |
| title                  | 标题                   |
| video                  | 视频                   |
| wrap                   | 容器，包，一般用于最外层         |
| wrapper                | 容器，包，一般用于最外层         |

## 3. JS规范

+ [js语言规范](https://guide.aotu.io/docs/js/language.html)
+ [js代码规范](https://guide.aotu.io/docs/js/code.html)

## 4. Vue规范

+ [vue代码规范](https://v2.cn.vuejs.org/v2/style-guide/index.html)