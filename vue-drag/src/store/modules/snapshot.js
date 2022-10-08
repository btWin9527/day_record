import {deepCopy} from "@/utitls/utils";

// 设置画布默认数据
let defaultcomponentData = []

function getDefaultcomponentData() {
  return defaultcomponentData
}

export function setDefaultcomponentData(data = []) {
  defaultcomponentData = data
}

const state = {
  snapshotData: [], // 编辑器快照数据
  snapshotIndex: -1, // 快照索引
}

const mutations = {
  setSnapshotIndex(state, snapshotIndex) {
    state.snapshotIndex = snapshotIndex
  },
  setSnapshotData(state, componentData) {
    // 添加新的快照
    state.snapshotData[++state.snapshotIndex] = deepCopy(componentData)
    // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
    if (state.snapshotIndex < state.snapshotData.length - 1) {
      state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1)
    }
  }
}

const actions = {
  // 撤销
  undo({state, commit, rootState}) {
    let {snapshotIndex} = state
    if (state.snapshotIndex >= 0) {
      snapshotIndex = --snapshotIndex;
      commit('setSnapshotIndex', snapshotIndex)
      const componentData = deepCopy(state.snapshotData[snapshotIndex]) || getDefaultcomponentData()
      let {curComponent} = rootState.base;
      if (curComponent) {
        // 如果当前组件不再componentData中，置空
        const needClean = !componentData.find(component => curComponent.id === component.id)
        if (needClean) {
          commit('base/setCurComponent', {component: null, index: null}, {root: true})
        }
      }
      commit('base/setComponentData', componentData, {root: true})
    }
  },
  // 重做
  redo({state, commit}) {
    let {snapshotIndex} = state
    if (state.snapshotIndex < state.snapshotData.length - 1) {
      snapshotIndex = ++snapshotIndex
      commit('setSnapshotIndex', snapshotIndex)
      commit('base/setComponentData', deepCopy(state.snapshotData[snapshotIndex]), {root: true})
    }
  },
  // 记录快照
  recordSnapshot({commit, rootState}) {
    commit('setSnapshotData', rootState.base.componentData)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}