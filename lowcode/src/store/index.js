import Vue from 'vue'
import Vuex from 'vuex'
import compose from './compose'
import contextmenu from './contextmenu'

Vue.use(Vuex)

const data = {
  state: {
    ...contextmenu.state,
    ...compose.state,
    // 画布组件数据
    componentData: [],
    // 页面全局数据
    canvasStyleData: {
      width: 1200,
      height: 740,
      scale: 100,
      color: '#000',
      opacity: 1,
      background: '#fff',
      fontSize: 14,
    },
    // 是否在编辑器中，用于判断复制、粘贴组件时是否生效，如果在编辑器外，则无视这些操作
    isInEdiotr: false,
    // 点击画布时是否点中组件，主要用于取消选中组件用。
    // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
    isClickComponent: false,
    curComponent: null,
    curComponentIndex: null,
  },
  mutations: {
    ...compose.mutations,
    ...contextmenu.mutations,
    /**
     * 添加组件
     * @param state
     * @param component
     * @param index
     */
    addComponent(state, {component, index}) {
      if (index !== undefined) {
        state.componentData.splice(index, 0, component)
      } else {
        state.componentData.push(component)
      }
    },
    setInEditorStatus(state, status) {
      state.isInEdiotr = status
    },
    setClickComponentStatus(state, status) {
      state.isClickComponent = status
    },
    setCurComponent(state, {component, index}) {
      state.curComponent = component
      state.curComponentIndex = index
    },
    setShapeStyle({curComponent}, {top, left, width, height, rotate}) {
      if (top !== undefined) curComponent.style.top = Math.round(top)
      if (left !== undefined) curComponent.style.left = Math.round(left)
      if (width) curComponent.style.width = Math.round(width)
      if (height) curComponent.style.height = Math.round(height)
      if (rotate) curComponent.style.rotate = Math.round(rotate)
    },
  }
}


export default new Vuex.Store(data)