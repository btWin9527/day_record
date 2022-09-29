import Vue from 'vue'

const component = [
  'VButton'
]

component.forEach((key) => {
  Vue.component(key, () => import(`@/custom-component/${key}`))
})