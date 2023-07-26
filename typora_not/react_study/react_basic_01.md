# React-basic

> React basic内容简介

+ Hello World
  + 虚拟dom和真实dom创建方式
  + 虚拟dom和真实dom比较
+ jsx语法规则
+ react中定义组件
  + 函数式组件
  + 类组件
+ 组件实例的三大属性_state
+ 组件实例的三大属性_props
+ 组件实例的三大属性_refs
  + 字符串形式ref(不建议使用)
  + 回调形式ref
  + createRef
+ react中收集表单数据
  + 非受控组件
  + 受控组件

## 1. Hello World

> react实现hello world至少需要5步

```html
<body>
  <!-- 1. 创建dom容器 -->
  <div id="app"></div>
  <!-- 2. 引入资源 -->
  <!-- 2.1 引入react -->
  <script src="../js/react.development.js"></script>
  <!-- 2.2 引入react-dom(react-dom必须在react之后引入) -->
  <script src="../js/react-dom.development.js"></script>
  <!-- 2.3 引入babel(用于转义jsx) -->
  <script src="../js/babel.min.js"></script>
  <!-- 3. babel转义(创建babel类型的script) -->
  <script type="text/babel">
   /* 4. 创建虚拟dom */
   const VDOM = (
   	<h2>hello world</h2>
   );
   /* 5.渲染虚拟dom到页面 */
   ReactDOM.render(VDOM, document.getElementById('app'));
  </script>
</body>
```

### 1.1 虚拟DOM和真实DOM创建方式

+ **jsx方式创建虚拟dom** (内容同上hello world)

+ **js创建虚拟dom**

```js
// React.crateElement(标签名称,标签属性,标签内容)
// 实现同上 <h2 id="title">hello world</h2>
React.createElement('h2',{
  id: 'title'
},'hello world');
```

### 1.2 虚拟DOM和真实DOM比较

> 关于虚拟dom：
>
> 1. 本质是Object类型对象
> 2. 虚拟dom比较轻量，真实dom比较重量（虚拟dom是react内部使用，无需真实dom挂载）
> 3. 虚拟dom最终会被react转换为真实dom呈现在页面上

```js
// 1. 创建虚拟DOM
const VDOM = (
  <h1 id="title">
    <span>Hello,React</span>
  </h1>);
  console.log(VDOM,'虚拟DOM');
const TDOM = document.querySelector('#demo');
console.dir(TDOM,'真实DOM')
```

## 2. jsx语法规则

1. 定义虚拟dom,不使用引号
2. 标签中混入js表达式，使用差值表达式{}
3. 样式的类名指定不要使用class，使用className
4. 内联样式使用`style={{key:value}}`形式实现
5. 虚拟dom必须只有一个根元素
6. 标签必须闭合
7. 标签首字母
   1. 小写字母开头，则将该标签转为html同名元素，若html无该标签对应的同名元素
   2. 若大写字母开头，react就去渲染对应的组件，若无组件，则报错

```html
<body>
  <!-- 前两步同hello world -->
  <!-- 3. babel转义(创建babel类型的script) -->
  <script type="text/babel">
  	const myId = 'aTgUiGu'; // 动态引入id属性
  	const myData = 'Hello, React'; // 动态引入文本内容
  	const spanStyle = { // 动态引入css样式
  		color: 'green',
  		fontSize: '30px'
  	};
  	const Fragment = React.Fragment;
  	// 4. 创建虚拟dom
  	const VDOM = (
  		<Fragment>
  			<h2 id={myId} className="title">
  			  <span style={spanStyle}>{myData}</span>
        </h2>
        <input type="text"/>
  		</Fragment>
  	);
  </script>
</body>

```

【补充】

`jsx的差值表达式中只能使用js表达式，不能使用js语句`

+ js表达式：一个表达式会产生一个值，可以放在任何地方
  + 例如 `a` `a+b` `demo(1)` `arr.map()` `function test(){}`
+ js语句：（由多个表达式组成）
  + 例如 `if(){}` `switch(){}`  `for(){}`

## 3. react中定义组件

### 3.1 函数式组件 （简单组件）

```jsx
// 创建组件
function MyComponent() {
  console.log(this) // undefined（原因：babel编译后开启严格模式）
  return (<h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>)
}
// 渲染组件到页面
ReactDOM.render(<MyComponent/>,document.getElementById('app'));
 /*
  * 执行了 ReactDOM.render(<MyComponent/>, document.getElementById('test'))后
  *   1. React解析组件标签，找到MyComponent组件
  *   2. 发现组件是使用函数定义，随后调用该函数，将返回的虚拟DOM转化为真实DOM,随后呈现到页面上
  * */
```

### 3.2 类组件

```jsx
// 创建组件
class MyComponent extends React.Component{
  render(){
    // render放在哪里? -- MyComponent的元凶对象上，供实例使用
    // render中的this? -- MyComponent的实例对象(组件实例对象)
    console.log(this,'render中的this') // MyComponent {}
    return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
  }
}
// 渲染组件到页面
ReactDOM.render(<MyComponent/>,document.getElementById('app'));
 /*
  * 执行了 ReactDOM.render(<MyComponent/>, document.getElementById('test'))后
  *   1. React解析组件标签，找到MyComponent组件
  *   2. 发现组件使用类定义，随后new出来该实例，并通过该实例调用到原型上的render方法
  *   3. 将render返回的虚拟dom转化为真实dom，随后呈现到页面中
  * */
```

## 4. 组件实例的三大属性_state

```jsx
// 创建组件
class Weather extends React.Component {
  // 构造器调用1次
  constructor(props){
    super(props);
    // 初始化状态
    this.state = {isHot: true};
    /* 2. 通过构造函数中bind绑定this */
    this.handleChangeState = this.handleChangeState.bind(this);
  }
  
  handleChangeState() {
    // handleChangeState放在Weather的原型对象上
    // 通过Weather实例调用changeWeather时，changeWeather中的this就是Weather
    // 由于handleChange是作为onClick的回调，所以不是通过实例调用的，是直接调用
    // 类中的方法默认开启了局部的严格模式，所以handleChangeState中this为undefined
    let {state: {isHot}} = this;
    // 状态修改需要setState进行更新，且更新是一种合并，不是替换
    this.setState({
      isHot: !isHot
    })
  }
  
  // render调用了 1+n次 (初始化1次+重新渲染的n次)
  render() {
    // 读取状态
    let {state: {isHot}} = this;
    /* 通过构造函数中bind绑定this */
    return <h1 onClick={this.handleChangeState}>今天天气很{isHot ? '炎热' : '凉爽'}</h1>
  }
}

ReactDOM.render(<Weather/>, document.getElementById('test'))；
```

+ **state简写**

```jsx
class Weather extends React.Component {
  state = {
    isHot: true
  }
  // 
  handleClick = ()=>{
    let {isHot} = this.state;
    this.setState({
      isHot: !isHot
    })
  }

  render(){
    let {isHot} = this.state;
    // 解决方法内部this指向的两种方法：bind;箭头函数（class内部声明箭头函数）
    return (<h1 onClick={this.handleClick}>今天天气很{isHot?'炎热':'凉爽'}</h1>)
  }
}
ReactDOM.render(<Weather/>, document.getElementById('test'))
```

## 5. 组件实例的三大属性_props

### 5.1 props的基本使用

```jsx
// 创建组件
class Person extends React.Component {
  render(){
    let {name,age,sex} = this.props;
    // props是只读的，不允许修改
    return (
      <ul>
      	<li>姓名：{name}</li>
        <li>性别: {sex}</li>
        <li>年龄：{age}</li>
      </ul>
    )
  }
}
// 限制props的参数类型
Person.propTypes = {
  name: PropTypes.string.isRequired, // string 必传
  sex: PropTypes.string,
  age: PropTypes.number,
  speak: PropTypes.func, // 函数
}
// 设置props的默认值
Person.defaultProps = {
  sex: '女',
  age: 18
}
const p = {
  name: 'test',
  sex: '男',
  age: 12
}
function speak() {

}
// 展开运算符无法展开对象，但在因为有babel转义，此处使用展开对象不会报错
ReactDOM.render(<Person {...p} speak={speak}/>,document.getElementById('test'));
```

### 5.2 props简写

```jsx
// 创建组件
class Person extends React.Component {
  constructor(props){
    // 构造器是否接收props,是否传递给super，取决于是否希望在构造器中通过this访问props
    super(props);
    console.log('constructor',this.props)
  }
  
  render(){
    let {name,age,sex} = this.props;
    // props是只读的，不允许修改
    return (
      <ul>
      	<li>姓名：{name}</li>
        <li>性别: {sex}</li>
        <li>年龄：{age}</li>
      </ul>
    )
  }
  	// static 不需要实例化类 即可直接通过该类来调用的方法，即称为’静态方法‘
    // 设置props的默认值
   static defaultProps = {
    sex: '女',
    age: 18
  }

    // 限制props的参数类型
   static propTypes = {
    name: PropTypes.string.isRequired, // string 必传
    sex: PropTypes.string,
    age: PropTypes.number,
    speak: PropTypes.func, // 函数
  }
}

const p = {
  name: 'test',
  sex: '男',
  age: 12
}
function speak() {

}
// 展开运算符无法展开对象，但在因为有babel转义，此处使用展开对象不会报错
ReactDOM.render(<Person {...p} speak={speak}/>,document.getElementById('test'));
```

### 5.3 函数式组件使用props

```jsx
// 创建组件
function Person({name,sex,name}){
  return(
  	 <ul>
      	<li>姓名：{name}</li>
        <li>性别: {sex}</li>
        <li>年龄：{age}</li>
      </ul>
  )
}

// 限制类型
Person.propTypes = {
  name: PropTypes.string.isRequired,
  sex: PropTypes.string,
  age: PropTypes.number
}
// 设置默认值
Person.defaultProps = {
  sex: '女',
  age: 12
}

const person = {
  name: 'test',
  sex: '男',
  age: 12
}
ReactDOM.render(<Person {...person}/>,document.getElementById('test'));
```

## 6. 组件实例三大属性refs

### 6.1 字符串形式ref(不建议使用)

```jsx
// 创建组件
class Demo extends React.Component {
  // 展示左侧数据
  showData = () => {
    const {inputRef} = this.refs;
    alert(inputRef.value);
  }

  // 展示右侧输入框数据
  showData2 = () => {
    const {inputRef2} = this.refs;
    alert(inputRef2.value);
  }

  render() {
    return (
      <div>
        <input ref='inputRef' type="text" placeholder="点击按钮提示数据"/>&nbsp;
        <button onClick={this.showData}>点我提示左侧数据</button>
        &nbsp;
        <input ref="inputRef2" type="text" placeholder="失去焦点提示数据" onBlur={this.showData2}/>&nbsp;
      </div>
    )
  }
}

ReactDOM.render(<Demo/>, document.getElementById('test'))
```



### 6.2 回调形式ref

```jsx
// 创建组件
class Demo extends React.Component {
  // 展示左侧数据
  showData = () => {
    alert(this.inputRef.value);
  }

  // 展示右侧输入框数据
  showData2 = () => {
    alert(this.inputRef2.value);
  }

  render() {
       /*
    * 使用ref回调函数以内联函数的方式调用时，在更新过程中该方法会被调用两次,
    * 使用类绑定可以避免重新调用，不过无关紧要（开发使用内联即可）
    *  */
    return (
      <div>
        <input ref={currentNode => this.inputRef = currentNode} type="text" placeholder="点击按钮提示数据"/>&nbsp;
        <button onClick={this.showData}>点我提示左侧数据</button>
        &nbsp;
        <input ref={e => this.inputRef2 = e} type="text" placeholder="失去焦点提示数据" onBlur={this.showData2}/>&nbsp;
      </div>
    )
  }
}

ReactDOM.render(<Demo/>, document.getElementById('test'))
```



### 6.3 createRef形式

```jsx
/*
	React.createRef调用可以返回一个容器，该容器会存储被ref所标识的节点，该容器是“专人专用”
*/
 /*
				(1).通过onXxx属性指定事件处理函数(注意大小写)
						a.React使用的是自定义(合成)事件, 而不是使用的原生DOM事件 —————— 为了更好的兼容性
						b.React中的事件是通过事件委托方式处理的(委托给组件最外层的元素) ————————为了的高效
				(2).通过event.target得到发生事件的DOM元素对象 ——————————不要过度使用ref
   */
class Demo extends React.Component {
  
  myRef = React.createRef();
  
  showData => {
  let {current:{value}} =  this.myRef;
  alert(value)
  }
  
   showData2 = (e) => {
    alert(e.target.value);
  }
   
  render(){
    <div>
    	<input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>
      &nbsp;
        <button onClick={this.showData}>点我提示左侧数据</button>
      <input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
    </div>
  }
}
```

## 7. react中收集表单数据

### 7.1 非受控组件

> 表单数据将交由 DOM 节点来处理

```jsx
  class Login extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault(); // 阻止表单提交
      const {username, password} = this;
      alert(`你输入的用户名是${username.value},你输入的密码是:${password.value}`)
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          用户名：<input type="text" ref={e => this.username = e} name="username"/>
          密码：<input type="password" ref={e => this.password = e} name="password"/>
          <button>登录</button>
        </form>
      )
    }
  }

  ReactDOM.render(<Login/>, document.getElementById('test'))
```

### 7.2 受控组件

> 表单数据由react组件来管理

```jsx
class Login extends React.Component {
    state = {
      username: '',
      password: ''
    }
    handleSubmit = (e) => {
      e.preventDefault(); // 阻止表单提交
      const {username, password} = this.state;
      alert(`你输入的用户名是${username},你输入的密码是:${password}`)
    }

    saveUsername = (e) => {
      this.setState({username: e.target.value})
    }
    savePassword = (e) => {
      this.setState({password: e.target.value})
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          用户名：<input type="text" name="username" onChange={this.saveUsername}/>
          密码：<input type="password" name="password" onChange={this.savePassword}/>
          <button>登录</button>
        </form>
      )
    }
  }

  ReactDOM.render(<Login/>, document.getElementById('test'))
```

+ 使用函数柯里化优化代码

```jsx
 /*
          高阶函数：如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数。
                  1.若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数。
                  2.若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数。
                  常见的高阶函数有：Promise、setTimeout、arr.map()等等

          函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。
            function sum(a){
              return(b)=>{
                return (c)=>{
                  return a+b+c
                }
              }
            }
          */
  // 1. 创建组件
  class Login extends React.Component {
    state = {
      username: '',
      password: ''
    }

    handleSubmit = (e) => {
      e.preventDefault(); // 阻止表单提交
      const {username, password} = this.state;
      alert(`你输入的用户名是${username},你输入的密码是:${password}`)
    }

    // 函数柯里化写法
    saveFormData = (type) => {
      return (e) => {
        this.setState({
          [type]: e.target.value
        })
      }
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          用户名：<input type="text" name="username" onChange={this.saveFormData('username')}/>
          密码：<input type="password" name="password" onChange={this.saveFormData('password')}/>
          <button>登录</button>
        </form>
      )
    }
  }

  ReactDOM.render(<Login/>, document.getElementById('test'))
```

+ 不使用函数柯里化优化代码

```jsx
 class Login extends React.Component {
    state = {
      username: '',
      password: ''
    }

    handleSubmit = (e) => {
      e.preventDefault(); // 阻止表单提交
      const {username, password} = this.state;
      alert(`你输入的用户名是${username},你输入的密码是:${password}`)
    }

    // 不使用函数柯里化写法
    saveFormData = (type, e) => {
      this.setState({
        [type]: e.target.value
      })
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          用户名：<input type="text" name="username" onChange={e => this.saveFormData('username', e)}/>
          密码：<input type="password" name="password" onChange={e => this.saveFormData('password', e)}/>
          <button>登录</button>
        </form>
      )
    }
  }

  ReactDOM.render(<Login/>, document.getElementById('test'))
```



