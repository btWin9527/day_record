import { $ } from '@/utils/utils'
export default {
  state: {
    areaData: { // 选中区域包含的组件以及区域位移信息
      style: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      },
      components: [],
    },
    editor: null,
  },
  mutations: {
    getEditor(state) {
      state.editor = $('#editor')
    },

    setAreaData(state, data) {
      state.areaData = data
    },
  }
}