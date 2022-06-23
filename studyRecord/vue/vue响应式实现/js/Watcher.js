// Watcher.js
class Watcher {
  constructor(vm, key, cb) {
    // 当前Vue实例
    this.vm = vm
    // 订阅的属性名
    this.key = key
    // 数据变化后，要执行的回调
    this.cb = cb
    // 触发Getter前，将当前订阅者实例存储给Dep类
    Dep.target = this
    // 记录属性更改之前的值，用于进行更新状态检测（导致了属性Getter的触发）
    this.oldValue = vm[key]
    // 操作完毕后清除taget,用于存储下一个Wather实例
    Dep.target = null
  }

  //
  update() {
    const newValue = this.vm[this.key]
    if (newValue === this.oldValue) return
    // 数据变化，调用更新后的回调
    this.cb(newValue)
  }
}