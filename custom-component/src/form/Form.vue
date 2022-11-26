<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'LgForm',
  provide() {
    return {
      form: this
    }
  },
  props: {
    rules: {
      type: Object
    },
    model: {
      type: Object
    }
  }
}
</script>

<style scoped>

</style>