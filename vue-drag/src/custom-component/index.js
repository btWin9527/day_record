import Vue from 'vue'

const component = [
  'VButton',
  'VText',
  'RectShape'
]

component.forEach((key) => {
  Vue.component(key, () => import(`@/custom-component/${key}`))
})