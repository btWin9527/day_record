// Vue.js
class Vue {
  constructor(options) {
    // 1. 存储属性
    this.$options = options || {}
    this.$data = options.data || {}
    // 判断el值的类型，并进行相应的处理
    const {el} = options
    this.$el = typeof el === 'string' ? document.querySelector(el) : el
    // 2. 将data注入Vue实例中
    _proxyData(this, this.$data)
    // *3. 创建Observer实例，监视data的属性变化
    new Observer(this.$data)
    // *4.调用Compiler
    new Compiler(this)
  }

}

// 将data的属性注入vue实例
function _proxyData(target, data) {
  Object.keys(data).forEach(key => {
    Object.defineProperty(target, key, {
      enumerable: true,
      configurable: true,
      get() {
        return data[key]
      },
      set(newVal) {
        data[key] = newVal
      }
    })
  })
}