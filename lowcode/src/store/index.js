import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const data = {
  state: {
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
  },
  mutations: {
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
    }
  }
}


export default new Vuex.Store(data)