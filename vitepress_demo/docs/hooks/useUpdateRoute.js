import useCompStore from '../store/copname.js'

const compStore = useCompStore()

export const useUpdateRoute = (routeName = 'button') => {
  compStore.updateName(routeName)
}
