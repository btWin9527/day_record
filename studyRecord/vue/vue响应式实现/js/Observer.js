// Observer.js
class Observer {
  // 接收传入的对象，将这个对象的属性转换为Getter/Setter
  constructor(data) {
    this.data = data
    // 遍历数据
    this.walk(data)
  }

  // 封装用于数据遍历的方法
  walk(data) {
    // 将遍历后的属性转换为Getter、Setter
    Object.keys(data).forEach(key => this.convert(key, data[key]))
  }

  // 封装用于将对象转换为响应式数据的方法
  convert(key, value) {
    defineReactive(this.data, key, value)
  }
}

// 用于为对象定义一个响应式的属性
function defineReactive(data, key, value) {
  // 检测是否为对象，如果是，创建一个新的Observer类
  observer(value)

  // 进行数据劫持
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('获取属性')
      return value
    },
    set(newValue) {
      console.log('设置属性')
      if (newValue === value) return
      value = newValue
      observer(value)
    }
  })
}

function observer(value) {
  if (typeof value === 'object' && value !== null) {
    new Observer(value)
  }
}