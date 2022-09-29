import {$} from '@/utitls/utils'

const state = {
  editor: null
}

const getters = {
  editor: state => state.editor
}

const mutations = {
  getEditor(state) {
    state.editor = $('#editor')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}