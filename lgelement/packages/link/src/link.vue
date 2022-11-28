<template>
  <div>
    <a :href="disabled?null:href"
       :class="{
      disabled: disabled,
      'no-underline': underline,
    }">
      <slot></slot>
    </a>
  </div>
</template>

<script>
export default {
  name: 'LgLink',
  props: {
    href: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.disabled {
  cursor: not-allowed;
}

.no-underline {
  text-decoration: none;
}
</style>
