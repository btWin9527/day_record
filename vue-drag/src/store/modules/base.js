const state = {
  // 画布组件数据
  componentData: [],
}

const getters = {
  componentData: state => state.componentData
}

const mutations = {
  // 拖拽添加组件
  addComponent(state, {component, index}) {
    if (index !== undefined) {
      state.componentData(index, 0, component)
    } else {
      // 给画布新增组件
      state.componentData.push(component)
    }
  }
}


export default {
  namespaced: true,
  getters,
  state,
  mutations,
}