import LgButton from './src/button.vue'

// vue组件use使用
LgButton.install = (Vue) => {
  Vue.component(LgButton.name, LgButton)
}

export default LgButton