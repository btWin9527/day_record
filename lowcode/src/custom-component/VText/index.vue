<template>
    <textarea
        v-if="editMode == 'edit'"
        :value="propValue"
        class="text textarea"
        @input="handleInput"
        ref="v-text"
    ></textarea>
  <div v-else class="text disabled">
    <div v-for="(text, index) in propValue.split('\n')" :key="index">{{ text }}</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: {
    propValue: {
      type: String,
    },
    element: {
      type: Object,
    },
  },
  computed: mapState([
    'editMode',
  ]),
  methods: {
    handleInput(e) {
      this.$emit('input', this.element, e.target.value)
    },
  },
}
</script>