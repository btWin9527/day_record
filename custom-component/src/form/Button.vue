<template>
  <button @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'LgButton',
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
      // 阻止默认提交表单
      evt.preventDefault()
    }
  }
}
</script>

<style scoped>

</style>