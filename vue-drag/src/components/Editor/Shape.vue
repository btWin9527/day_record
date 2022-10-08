<!-- 画布渲染页面组件 -->
<template>
  <div
      @click="selectCurComponent"
      @mousedown="handleMouseDownOnShape"
      class="shape">
    <slot></slot>
  </div>
</template>

<script>
import {isPreventDrop} from "@/utitls/utils";
import eventBus from "@/utitls/eventBus";

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
    element: {
      required: true,
      type: Object,
      default: () => {
      }
    },
  },
  methods: {
    handleMouseDownOnShape(e) {
      // 将当前组件的事件传播出去，目前的消费是VText组件
      this.$nextTick(() => eventBus.$emit('componentClick'))
      this.$store.commit('base/setClickComponentStatus', true)
      if (isPreventDrop(this.element.component)) {
        // 阻止默认行为
        e.preventDefault()
      }
      // 阻止事件冒泡
      e.stopPropagation()
      this.$store.commit('base/setCurComponent', {component: this.element, index: this.index})
      const pos = {...this.defaultStyle}
      // clientX, clientY 为鼠标相对于当前窗口的坐标
      const startY = e.clientY
      const startX = e.clientX
      // 若直接修改属性，值的类型会变为字符串，所以需要转位数值类型
      const startTop = Number(pos.top)
      const startLeft = Number(pos.left)
      this.bindMouseEvent({startY, startX, startTop, startLeft, pos})
    },
    selectCurComponent(e) {
      // 阻止向父组件冒泡
      e.stopPropagation()
      e.preventDefault()
      this.$store.commit('contextmenu/hideContextMenu')
    },
    // 手动绑定鼠标移动事件
    bindMouseEvent({startY, startX, startTop, startLeft, pos}) {
      // todo: 存储快照使用
      let hasMove = false
      const move = (moveEvent) => {
        hasMove = true
        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        pos.top = curY - startY + startTop
        pos.left = curX - startX + startLeft
        // 修改当前组件样式
        this.$store.commit('base/setShapeStyle', pos)
      }
      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }
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