const state = {
  // 画布组件数据
  componentData: [],
  // 当前组件实例
  curComponent: null,
  // 当前组件实例在画布组件中的索引
  curComponentIndex: null,
  // 若没有点中组件，并在画布空白处弹起鼠标，则取消当前组件的选中状态
  isClickComponent: false,
  // 编辑器模式 edit preview
  editMode: 'edit',
}

const getters = {
  componentData: state => state.componentData,
  curComponent: state => state.curComponent,
  curComponentIndex: state => state.curComponentIndex,
  isClickComponent: state => state.isClickComponent,
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
  },
  // 设置组件点击状态
  setClickComponentStatus(state, status) {
    state.isClickComponent = status
  },
  // 设置当前组件信息
  setCurComponent(state, {component, index}) {
    state.curComponent = component
    state.curComponentIndex = index
  },
  setShapeStyle({curComponent}, {top, left, width, height, rotate}) {
    if (top) curComponent.style.top = Math.round(top)
    if (left) curComponent.style.left = Math.round(left)
    if (width) curComponent.style.width = Math.round(width)
    if (height) curComponent.style.height = Math.round(height)
    if (rotate) curComponent.style.rotate = Math.round(rotate)
  },
  setEditMode(state, mode) {
    state.editMode = mode
  },

}


export default {
  namespaced: true,
  getters,
  state,
  mutations,
}