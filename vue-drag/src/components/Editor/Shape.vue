<!-- 画布渲染页面组件 -->
<template>
  <div class="shape">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    defaultStyle: {
      required: true,
      type: Object,
      default: () => {
      },
    },
    index: {
      required: true,
      type: [Number, String],
      default: 0,
    },
  }
}
</script>

<style scoped lang="scss">
.shape {
  position: absolute;

  &:hover {
    cursor: move;
  }
}
</style>