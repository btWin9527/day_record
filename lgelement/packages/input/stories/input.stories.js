import LgInput from '../'

export default {
  title: 'LgInput',
  component: LgInput
}

export const Text = () => ({
  components: { LgInput },
  template: '<lg-input v-model="value"></lg-input>',
  data () {
    return {
      value: 'admin'
    }
  }
})

export const Password = () => ({
  components: { LgInput },
  template: '<lg-input type="password" v-model="value"></lg-input>',
  data () {
    return {
      value: 'admin'
    }
  }
})
