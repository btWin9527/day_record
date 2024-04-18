import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const useCompStore = new Vuex.Store({
  id: 'comp',
  state:  {
    currentName: ''
  },
  mutations: {
    updateName (state, name) {
      state.currentName = name
    }
  }
})
export default useCompStore
