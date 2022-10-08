import {swap} from "@/utitls/utils";
import toast from "@/utitls/toast";

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
  lock({curComponent}) {
    curComponent.isLock = true
  },

  unlock({curComponent}) {
    curComponent.isLock = false
  },
  deleteComponent(state, index) {
    if (index === undefined) {
      index = state.curComponentIndex
    }
    if (index === state.curComponentIndex) {
      state.curComponentIndex = null
      state.curComponent = null
    }
    if (/\d/.test(index)) {
      state.componentData.splice(index, 1)
    }
  },
  upComponent(state) {
    const {componentData, curComponentIndex} = state
    // 上移图层 index,表示元素在数组中越后
    if (curComponentIndex < componentData.length - 1) {
      swap(componentData, curComponentIndex, curComponentIndex + 1)
      state.curComponentIndex = curComponentIndex + 1
    } else {
      toast('已经到顶了')
    }
  },
  downComponent(state) {
    const {componentData, curComponentIndex} = state
    // 下移图层index，表示元素在数组中越往前
    if (curComponentIndex > 0) {
      swap(componentData, curComponentIndex, curComponentIndex - 1)
    } else {
      toast('已经到底了')
    }
  },
  topComponent(state) {
    const {componentData, curComponentIndex, curComponent} = state
    // 置顶
    if (curComponentIndex < componentData.length - 1) {
      componentData.splice(curComponentIndex, 1)
      componentData.push(curComponent)
      state.curComponentIndex = componentData.length - 1
    } else {
      toast('已经到顶了')
    }
  },

  bottomComponent(state) {
    const {componentData, curComponentIndex, curComponent} = state
    // 置底
    if (curComponentIndex > 0) {
      componentData.splice(curComponentIndex, 1)
      componentData.unshift(curComponent)
      state.curComponentIndex = 0
    } else {
      toast('已经到底了')
    }
  },
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
}