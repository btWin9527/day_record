# 开发疑难点记录

## 1. twitter分享

> twitter分享主要是twitter抓取分享页的meta内容 【==抓取的内容为js脚本执行之前的静态html文件内容, 无法通过前端动态配置该内容，若需要动态化需要服务端渲染或nginx层处理==】

```html
<!--
    浏览器抓取页面meta标签内容时，不支持使用js动态写入内容，
    若需要动态配置分享内容，则需要使用服务端渲染修改content内容，
    或使用静态页作为中间分享页，由服务端动态写入内容，然后重定向到项目页面
-->
<!-- twitter-->
<meta property="twitter:url" content="https://bdx.ysxapp.com" />
<meta name="twitter:title" content="Welcome to the Big Dipper multilingual pc website"/>
<meta name="twitter:description"  content="Welcome to the Big Dipper multilingual pc website" />
<meta name="twitter:site" content="https://bdx.ysxapp.com">
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://bdx.ysxapp.com/star.png" />

```

```html
    
// html
<a :href="tw_href">
    <img src="@/assets/imgs/twitter-icon.png" alt="twitter">
</a>

<script>
// js
data () {
    return {
      href_com: 'https://bdx.ysxapp.com/#/login?invite_code='+this.$store.getters.getInviteCode,
      text_com: 'Welcome to the Big Dipper multilingual pc website -> My invitation code: '+12321,
      tw_href: '',
    }
},
created () {
    this.initHref()
},
methods: {
    initHref () {
      // twitter 分享链接
      this.tw_href = `javascript:window.open('https://twitter.com/share?text=`+this.text_com+`&url=`+this.href_com+`','_blank','toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=800, height=450,top=100,left=350');void(0)`
    },

},
</script>
```

## 2. rem配置

### 2.1 rem适配规则

```js
/* 为了书写方便可以直接通过 px 布局，然后在打包时利用 pxtorem 库转化为基于 rem 的布局 */
(function (baseFontSize) {
    const _baseFontSize = baseFontSize || 75;
    const ua = navigator.userAgent;
    const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    const dpr = window.devicePixelRatio || 1;
    if (!isIos && !(matches && matches[1] > 534)) {
        // 如果非iOS, 非Android4.3以上, dpr设为1;
        dpr = 1;
    }
    const scale = 1 / dpr;
    const metaEl = document.querySelector('meta[name="viewport"]');
    if (!metaEl) {
        metaEl = document.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        window.document.head.appendChild(metaEl);
    }
    metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);

    document.documentElement.style.fontSize = document.documentElement.clientWidth / (750 / _baseFontSize) + 'px';
})();

```

### 2.2 阿里flexible.js适配

```js

(function flexible (window, document) {
  var docEl = document.documentElement; // 获取html元素(所有主要浏览器都支持该属性)
  var dpr = window.devicePixelRatio || 1; // 获取当前设置下物理像素与虚拟像素的比值

  /*
   * @methods setBodyFontSize   设置body标签的fontSize
   * @descriptions              fontSize = (12 * dpr) + 'px'; 设置默认字体的大小，默认字体大小继承自body
  */
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
        // DOMContentLoaded事件在文档完全加载和解析之后触发，无需等待css、图片、子框架加载完毕。
        // IE9+、edge、火狐、Opera、chrome、safria浏览器支持
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  /*
    * @methods setRemUnit   设置root元素的fontSize
    * @descriptions         fontSize = clientWidth / 10 + 'px'
  */
  function setRemUnit () {
  // docEl.clientWidth -- 获取浏览器窗口文档显示区域宽度，不包括滚动条
    var rem = docEl.clientWidth / 10; 
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit();

  // 当页面展开或重新设置大小的时候，触发重新设置html的fontSize
  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  // 检测0.5px的支持，支持则root元素的class中有hairlines
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))

```

## 2.3 1px边框

```css
div {
    height:1px;
    background:#000;
    -webkit-transform: scaleY(0.5);
    -webkit-transform-origin:0 0;
    overflow: hidden;
}

/* 2倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 2.0) {
    .border-bottom::after {
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}

/* 3倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 3.0) {
    .border-bottom::after {
        -webkit-transform: scaleY(0.33);
        transform: scaleY(0.33);
    }
}

```

## 3.移动端样式初始化（新增）

> 1. 点击链接出现半透明灰色背景

```css
/*
根本原因是-webkit-tap-highlight-color，这个属性是用于设定元素在移动设备（如Adnroid、iOS）上被触发点击事件时，响应的背景框的颜色。
*/
div,input(selector) {
-webkit-tap-highlight-color : rgba (255, 255, 255, 0) ;
// i.e . Nexus5/Chrome and Kindle Fire HD 7 ''
-webkit-tap-highlight-color : transparent ;  
}

```

> 2. 屏蔽用户选择 -- 禁止用户选择页面中的文字或图片

```css
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;

```

> 3. ==移动端清除输入框内阴影==

```css
/*
在iOS上，输入框默认有内部阴影，但无法使用 box-shadow 来清除
*/
input {
    -webkit-appearance: none;
}
```

> 4. 禁止保存或拷贝图像

```css
img {
    -webkit-touch-callout: none;
}
```

> 5. 解决字体在移动端比例缩小后出现锯齿

```css
body{
   -webkit-font-smoothing: antialiased;
}

```

> 6. ==设置input里面placeholder字体的大小==

```css
    input::-webkit-input-placeholder{ font-size:20px;}

```

> 7. 手机拍照和上传图片

```html
<input type="file">的accept 属性
<!-- 选择照片 -->
<input type=file accept="image/*">
<!-- 选择视频 -->
<input type=file accept="video/*">

```

> 8. ==输入框自动填充颜色==

```css
/*
针对input标签已经输入过的，会针对曾经输入的内容填充黄色背景，这是webkit内核自动添加的，对应的属性是autocomplete,默认是on,另对应的样式是input:-webkit-autofill 且是不可更改的
*/
/* 设置盒子的内阴影为你常态的颜色 */
input {
box-shadow:0 0  0 1000px  #fff inset ;
 -webkit-box-shadow: 0 0 0px 1000px #fff inset;
}
```

> 9. 移动端去除type为number的箭头

```css
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
      -webkit-appearance: none !important;
      margin: 0; 
  }

```

## 4. vue中使用swiper

### 4.1 swiper添加点击事件

```html
<template>
 <swiper :options="bannerOpt" ref="banner">
        <swiper-slide v-for="(v,i) in swiperArr" :key="i">
          <div class="slide-contain">
            <img :src="v.url" :data-idx="i"/>
          </div>
        </swiper-slide>
        <!-- 分页器导航自定义 -->
        <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
    export default {
     data(){
        // banner配置项
        bannerOpt: {
          speed: 600, // swiper切换速度，即触摸滑动时释放至贴合的时间
          loop: true, // 控制是否无缝衔接
          autoplay: { // 控制swiper自动轮播
          /* bug: 解决swiper手动触摸后停止 */
            disableOnInteraction: false, // 属性介绍：用户操作swiper后，是否禁止autoplay,默认为true
            delay: 2500// 自动轮播的延迟时间
          },
          preventClicksPropagation: false,// 属性介绍： 阻止click冒泡。拖动Swiper时阻止click事件,默认为true
          pagination: {// 分页器导航
            el: '.swiper-pagination'
          }
        },
        swiperArr:[...]// 数据省略
    },
      computed:{
       banner() {
        return this.$refs.banner.swiper
        },
      },
      methods:{
        /* 给swiper绑定点击事件 */ 
          handleSwiperClick(){
              this.banner.on('tap',e =>{
                  // 获取自定义属性,表示点击数据的索引
                  let idx = Number(e.target.dataset.idx);
                  // 点击事件的具体逻辑
                  this.clickDoSomeThing(idx);
              })
          }
      },
      mounted(){
          this.handleSwiperClick();
      }
    }
</script>
<style>
    /* 自定义swiper分页器样式 */
    /deep/ .swiper-pagination-bullet {
      background-color: #fff;
      opacity: 0.15;
      width: 12px;
      height: 12px;
      margin: 0 6px;
    }

    /deep/ .swiper-pagination-bullet-active {
      background-color: #fff;
      width: 12px;
      height: 12px;
      opacity: 0.5;
    }
  }
</style>
```

### 4.2 swiper异步获取数据无限轮播失效

> 这是由于接口获取数据属于异步操作,swiper初始化也属于异步操作，解决方法是将swiper封装为子组件，数据由父组件传递，并在父组件中通过v-if来控制swiper的初始化时间

```html
    <!-- 父组件 -->
    <template>
        <div>
            <swiperChild v-if="!!swiperArr"/>
        </div>
    </template>
    <script>
        import swiperChild from './swiperChild'
        export default {
            components:{
                swiperChild
            },
            data(){
                return {
                    swiperArr:null
                }
            },
            methods:{
                getSwiperData(){
                    let res = [...];// 省略数据
                    this.swiperArr = res;
                }
            }
        }
    </script>
    <!-- 子组件：代码省略 -->
    
```

### 5. input 设置flex:1 失效

> 原因：input兼容弹性盒子有问题，它会有一个自己默认的最小长度

```html
<!--
    场景：左右布局，左边Input占剩余宽度,右边按钮定宽
    解决方法：给input输入框加一个div父元素，然后这个div设置flex:1,input设置width:100%；即可解决问题
-->
    <div class="box">
        <div class="box-left">
            <input/>
        </div>
        <div class="box-right">
        </div>
    </div>
    <style lang="scss">
        .box {
            display: flex;
            &-left {
                flex:1;
                height: 100px;
                input {
                    width:100%;
                }
            &-right {
                width: 100px;
             }
            }
        }
    
    </style>
```

### 6. for循环中添加点击事件获取点击元素索引

```js
// 方法一
var btns=document.querySelectorAll('button');
    for(var i=0;i<btns.length;i++){
        btns[i].index=i;
        btns[i].onclick=function(){
            alert('点击了第'+(this.index+1)+'个按钮')
        }
    }

// 方法二
var btns=document.querySelectorAll('button');
    for(var i=0;i<btns.length;i++){
        (function(i){
            btns[i].onclick=function(){
                alert('点击了第'+(i+1)+'个按钮')
            };
        })(i);
    }
    
```

### 7. 将对象b的数据覆盖对象a的数据，多出的数据合并到新对象中

```js
    let a = {a:1,b:2,c:3};
    let b = {a:4,b:4,d:5};
    // 使用展开运算符处理
    console.log({...a,...b}); // {a:4,b:4,c:3,d:5}
    // 注意：若使用Object.assign(targetObj,sourceObj)时，则不会覆盖原有数据，只会添加新增数据，不适合使用数据更新
    console.log(Object.assign(b,a)); // {a:1,b:2,d:5,c:3}
```

### 8. 将数据按日期分组（一般在流水中使用）

```js
    /**
     * @method          departTimeArr       数据分类
     * @description     将数组类数据按日期分组
     *
    */
    function departTimeArr(arr){
        let obj = {};
        arr.forEach((item,index)=>{
       // 将数据按日期分组
  let key = this.$moment(Number(item.cts) * 1000).format('YYYY/MM/DD');
            if(typeof obj[key] !== "undefined"){
                obj[key].push(item);
            }else{
                obj[key] = [];
                obj[key].push(item);
            }
        });
        return obj;
    }
    
  let arr = [
    {id:1,cts:1587437726,data:'...'},
    {id:2,cts:1587007726,data:'...'},
    {id:3,cts:1587127726,data:'...'},
    {id:4,cts:1587227726,data:'...'},
    ];
  let newData = departTimeArr(arr); // 获取到分组后的数据
```

### 9. 枚举类

```js
const ResourceStatusEnum = new EsEnum([
    {code: 'WAIT_APPROVE', name: "未审核"},
    {code: 'ENABLED', name: '启用'},
    {code: 'REFUSED', name: '审核未通过'},
    {code: 'DISABLED', name: '停用'}
]);

console.log(ResourceStatusEnum.ENABLED.name);  // 启用
console.log(ResourceStatusEnum.getNameByCode('ENABLED'));  //启用
console.log(ResourceStatusEnum.getValues());
/*
[ { code: 'WAIT_APPROVE', name: '未审核' },
  { code: 'ENABLED', name: '启用' },
  { code: 'REFUSED', name: '审核未通过' },
  { code: 'DISABLED', name: '停用' } ]
*/
```

### 10. 输入框输入中文事件监听

> 处理场景：在使用oninput监控输入框内容变化时，我们期望仅在value值变化时，才触发oninput事件，而在中文输入下，未选词时的按键也会触发oninput事件

```js
// compositionupdate不兼容safari浏览器
$(function () {
            var cpLock = true;
            $('#textbox').off().on({
                compositionstart: function () {//中文输入开始
                    cpLock = false;
                },
                compositionend: function () {//中文输入结束
                    cpLock = true;
                },
                input: function () {//input框中的值发生变化
                    if (cpLock)
                        this.value = this.value.replace(/[^A-Za-z0-9]/g, '');
                }
            })
        });

```

### 11. 开发环境解决跨域

```text
# 方法1：chrome扩展插件解决
CORS Unblock
# 方法2：vue-cli配置

```

### 12. 一键换肤实现

参考：
https://juejin.im/post/5ca41617f265da3092006155

### 13. mixins介绍

> 若有些公共组价使用比较频繁，可以使用mixin(混入)

```js
import header from 'common/header'
import sidebar from 'common/sidebar'
import comTab from 'common/comTab'

export default {
    data(){
        return {
            
        }
    },
    filters: {
        
    },
    methods: {
        
    },
    components: {
        header,
        sidebar,
        comTab
    }
    
}

// 使用
new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})
```

### 14. 处理iframe页面置于外部跳转

```js
    // 获取父级页面地址栏
function getParentUrl() { 
    var url = null;
    if (window.parent !== window) { 
        try { // 同源处理
           url = window.parent.location.href; 
        }catch (e) { // 非同源处理
           url = document.referrer; 
        } 
     }
     return url;
 }
// 获取父级页面域名
function getParentOrigin(originEnum){
  var parentHref = getParentUrl(); // 获取父页面地址栏
   var parentOrigin = ''; // 父级页面域名
  if(parentHref.includes(originEnum.ke) || parentHref.includes(originEnum.keShort)){
 parentOrigin = originEnum.ke;
  }
  if(parentHref.includes(originEnum.com)){
 parentOrigin = originEnum.com;
  }
  if(parentHref.includes(originEnum.ng)){
 parentOrigin = originEnum.ng;
  }
  if(parentHref.includes(originEnum.in)){
 parentOrigin = originEnum.in;
  }
  if(!parentOrigin){
 parentOrigin = originEnum.ke;
  }
  return parentOrigin;
}
// 处理重写跳转链接
function handleRewriteHref(parentOrigin) {
  var a_obj = document.body.getElementsByTagName("a");
  for (var i = 0; i < a_obj.length; i++) {
    let oldUrl = a_obj[i].getAttribute('href');
    if(!oldUrl.includes('https')){
       a_obj[i].setAttribute("href", parentOrigin + oldUrl);
    }
    a_obj[i].setAttribute("target", "_top");
  }
}

// 枚举域名
var originEnum = {
 ke: 'https://www.bangbet.co.ke',
   keShort: 'https://bangbet.co.ke',
    ng: 'https://bangbet.com.ng',
   com: 'https://bangbet.com',
   in: 'https://bangbet.in'
};
// 处理iframe页面跳转外部页面
// 处理iframe页面跳转使用父页面域名
var parentOrigin = getParentOrigin(originEnum);
handleRewriteHref(parentOrigin);

```

### 15. 忽略moment中locale语音包

> 解决moment打包后文件过大

```js
// vue.config.js配置
const webpack = require('webpack')
module.exports = {
    chainWebpack: config =>{
       // 优化moment 去掉国际化内容
    config
    .plugin('ignore')
    // 忽略/moment/locale下的所有文件
    .use(new webpack.IgnorePlugin(/^\.\/locale$/,/moment$/))
    }  
}
// main.js配置
import moment from 'moment'
//手动引入所需要的语言包
import 'moment/locale/zh-cn';
// 指定使用的语言
moment.locale('zh-cn');

// todo: 优化方案(使用day.js代替moment)

```

### 16. vue中加载js资源

```js
/**
 * @method  promiseLoad    使用promise加载js资源
 * @param   src            资源地址
 */
function promiseLoad(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
    script.onload = function () {
      resolve(true);
    }
    if (!script.onload) reject(false);
  })
}

```

### 17. window.location.search 和 window.location.href的区别

> **查询字符串search只能在取到“？”后面和“#”之前的内容，如果“#”之前没有“？”search取值为空**

```js
// window.location.search
// window.location.search 获取的为当前url的? 开始的字符串
// 如:http://www.51js.com/viewthread.php?tid=22720 ,它的search就是?tid=22720
// window.location.href
// location.href 返回完整的 URL。 如：http://www.cftea.com/foo.asp?p=1

// todo: location.search为空的情况，当url中? 前有#，location.search就为空
// 查询字符串search只能在取到“？”后面和“#”之前的内容，如果“#”之前没有“？”search取值为空
/**
     * 解析URL传参
     * @param {Object} key
     */
function getQueryString(key) {
    var after = window.location.search;
    if(after.indexOf('?') === -1) return null; //如果url中没有传参直接返回空

    //key存在先通过search取值如果取不到就通过hash来取
    after = after.substr(1) || window.location.hash.split("?")[1];
    if(after) {
        var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
        var r = after.match(reg);
        if(r != null)
        {
            return  decodeURIComponent(r[2]);
        }
        else
        {
            return null;
        }
    }
}
// 如果为hash模式，使用字符串分割截取参数
function GetQueryString(param) { //param为要获取的参数名 注:获取不到是为null
            var currentUrl = window.location.href; //获取当前链接
            var arr = currentUrl.split("?");//分割域名和参数界限
            if (arr.length > 1) {
                arr = arr[1].split("&");//分割参数
                for (var i = 0; i < arr.length; i++) {
                    var tem = arr[i].split("="); //分割参数名和参数内容
                    if (tem[0] == param) {
                        return tem[1];
                    }
                }
                return null;
            }
            else {
                return null;
            }
        }
```

### 18. input输入银行卡每隔4位一空

> 问题记录：添加的空格被视为非光标输入，光标的位置会自动前移一位
例：输入“12345”，input里的内容变为“1234 5”，光标的位置会在5的前面，而不是5的后面

```js
// 处理方法：通过监听输入的值，设置光标位置为输入内容的长度即可(通过this.$nextTick设置光标)

```

### 19. 监听storage值变化

```js
// Vue原型绑定方法
/**
 * @description
 * @author (Set the text for this tag by adding docthis.authorName to your settings file.)
 * @date 2019-05-29
 * @param { number } type 1 localStorage 2 sessionStorage
 * @param { string } key 键
 * @param { string } data 要存储的数据
 * @returns 
 */
Vue.prototype.$addStorageEvent = function (type, key, data) {
    if (type === 1) {
		// 创建一个StorageEvent事件
		var newStorageEvent = document.createEvent('StorageEvent');
		const storage = {
		    setItem: function (k, val) {
		        localStorage.setItem(k, val);
		        // 初始化创建的事件
		        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
		        // 派发对象
		        window.dispatchEvent(newStorageEvent);
		    }
		}
		return storage.setItem(key, data);
	} else {
		// 创建一个StorageEvent事件
		var newStorageEvent = document.createEvent('StorageEvent');
		const storage = {
		    setItem: function (k, val) {
		        sessionStorage.setItem(k, val);
		        // 初始化创建的事件
		        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
		        // 派发对象
		        window.dispatchEvent(newStorageEvent);
		    }
		}
		return storage.setItem(key, data);
	}
}

// 组件中操作storage时添加
this.$addStorageEvent(2, "user_info", data);

// 在另一个组件中mounted钩子函数监听
window.addEventListener('setItem', (e) => {
     console.log(e);
});

```

### 20. 理解微任务和宏任务的区别

```js
console.log('sync1');

setTimeout(function(){
    console.log('setTimeout1');
},0);

// Promise 中的代码也是同步执行的
var promise = new Promise(function(resolve,reject){
    setTimeout(function(){
        console.log('setTimeoutPromise');
    },0);
    console.log('promise');
    resolve();
});

promise.then(()=>{
    console.log('pro_then');
    setTimeout(()=>{
        console.log('pro_timeout');
    }, 0)
})

setTimeout(function(){
    console.log('last_setTimeout')
},0);

console.log('sync2');


/*
    执行结果：
    'sync1'
    'promise'
    'sync2'
    'pro_then'
    'setTimeout1'
    'setTimeoutPromise'
    'last_setTimeout'
    'pro_timeout'
*/

```

### 21. this.$route.query获取不到值

```js
// route.js未执行就使用数值
this.$router.onReady(()=>{
    if(this.$route.query.source != undefined && this.$route.query.source != null){
        console.log(this.$route.query.source,'获取到地址栏数据')
    }
})

```

### 22. 浏览器环境判断

```js
// 判断是否为浏览器环境
var inBrowser = typeof window !== 'undefined';
// 判断是否为微信平台
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
// UA检测
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
// 判断是否为IE浏览器
var isIE = UA && /msie|trident/.test(UA);
// 判断是否为IE9
var isIE9 = UA && UA && UA.indexOf('msie 9.0') > 0;
// 判断是否为Edge
var isEdge = UA && UA.indexOf('edge/') > 0;
// 判断是否为android
var isAndroid = (UA && UA.indexOf('android')>0 || (weexPlatform === 'android'));
// 判断是否为ios
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
// 判断是否为chrome浏览器
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
// 判断是否为firefox浏览器
  var isFF = UA && UA.match(/firefox\/(\d+)/);
```

### 23. 多级嵌套父组件或子组件方法调用

> vue中通过$parent或$children调用多级嵌套的父或子组件的方法

> emitter.js

```js
/*
    @description  遍历寻找所有子孙组件，假如子孙组件和componentName组件名称相同的话，则触发$emit的事件方法，数据为 params.
 如果没有找到 则使用递归的方式 继续查找孙组件，直到找到为止，否则继续递归查找，直到找到最后一个都没有找到为止
*/
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

export default {
  methods: {
    /**
     * @method dispatch                     查找所有父级，直到找到要找到的父组件，并在身上触发指定的事件
     * @param  componentName        组件名
     * @param  eventName            事件名
     * @param  params        触发时带入的参数
     */
    dispatch(componentName, eventName, params) {
      // 查找到当前元素的父组件，如果没有就使用根节点，并取父组件的组件名用于后期匹配
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      // while循环，用于循环父组件，直到找到或者到达根元素，匹配不到
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 当有匹配到的父组件时，就去触发父组件的对应的事件函数
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
     * @method broadcast            事件广播
     * @param  componentName        组件名
     * @param  eventName            事件名
     * @param  params        触发时带入的参数
     */
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
```

> dispatch调用父组件的方法

```js
/* 父组件 */
export default {
    name: 'eleComponents',
     methods: {
      testClick() {
        console.log(document.getElementById('testBtn'))
      }
    },
    mounted(){
        // 调用dispatch的获取元素方法
      this.$on('getTestBtn', this.testClick); 
    }
}
/* 子组件 */
methods:{
    // 需要调用父组件的方法
    handleChange(){
         this.dispatch('eleComponents', 'getTestBtn');
    }
}
```

> broadcast调用父组件的方法

```js
/* 子组件 */
export default {
    name: 'verifyCountBtn',
     methods: {
      sendVerifyCode() {
        console.log(document.getElementById('testBtn'))
      }
    },
    mounted(){
        // 调用dispatch的获取元素方法
      this.$on('sendVerifyCode', this.sendVerifyCode); 
    }
}
/* 父组件 */
methods:{
    // 需要调用子组件的方法
    handleChange(){
         this.broadcast('verifyCountBtn', 'sendVerifyCode');
    }
}
```

### 24. storage数据存储与读取

> JSON.parse()只能解析JSON.stringfy()的数据(对象或字符串)，否则会报错抛出异常，则需要在存储时JSON.stringfy()处理

```js
// 模拟字符串存储与读取处理
let a = 'abc';
console.log(JSON.parse(a));// 报错,数据格式异常
let b = JSON.stringfy(a);
console.log(JSON.parse(b)); // 'abc'
```

```js
// 封装工具方法
export default class BetStorage {
    static setLocal(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    static getLocal(key) {
        let value = window.localStorage.getItem(key);
        // console.log("value", value);
        return value == "undefined" || value == "null" ? "" : JSON.parse(value);
    }
    static setSession(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }
    static getSession(key) {
        let value = window.sessionStorage.getItem(key);
        return value == "undefined" || value == "null" ? "" : JSON.parse(value);
    }
    static clearOneLocal(key) {
        window.localStorage.removeItem(key);
    }
    static clearOneSession(key) {
        window.sessionStorage.removeItem(key);
    }
    static clearAllLocal() {
        window.localStorage.clear();
    }
    static clearAllSession() {
        window.sessionStorage.clear();
    }
}

```

### 25. git对文件大小写修改无反应

```shellScript
    git config core.ignorecase false
```

### 26. 同路由不同参数页面不更新

> vue-router 从 /post-page/a 跳转到 /post/-page/b ,页面数据未更新(原因：vue-router智能的发现这是同一个组件，决定复用该组件，在created函数内的方法未执行)

```html
 <!--解决方法
 @description  在router-view添加不同的key,即使是公共组件，url变化也会重新创建该组件
-->
<router-view :key="$route.fullpath"></router-view>
```

