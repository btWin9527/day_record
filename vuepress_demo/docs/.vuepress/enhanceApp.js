import Vuex from 'vuex'
import store from '../store/copname'

export default ({Vue}) => {
  Vue.use(Vuex)
  Vue.mixin({store: store})
}
