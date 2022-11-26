import Button from './src/button.vue'

// 方便使用vue.use
Button.install = Vue => {
  Vue.component(Button.name, Button)
}

export default Button
