<template>
  <div
      id="editor"
      class="editor"
      @mousedown="handleMouseDown"
      @contextmenu="handleContextMenu"
  >
    <!-- 页面组件列表展示 -->
    <Shape
        v-for="(item, index) in componentData"
        :key="item.id"
        :element="item"
        :index="index"
        :style="getShapeStyle(item.style)"
        :default-style="item.style">
      <component
          :is="item.component"
          :id="'component' + item.id"
          class="component"
          :prop-value="item.propValue"
          :element="item"
          :style="getComponentStyle(item.style)"
      />
    </Shape>
    <!-- 右击菜单 -->
    <ContextMenu/>
  </div>
</template>

<script>
import ContextMenu from "@/components/Editor/ContextMenu";
import Shape from "@/components/Editor/Shape";
import {mapGetters} from "vuex";
import {getStyle, getShapeStyle} from "@/utitls/style";

export default {
  components: {
    Shape,
    ContextMenu
  },
  data() {
    return {
      svgFilterAttrs: ['width', 'height', 'top', 'left', 'rotate'],
    }
  },
  computed: {
    ...mapGetters('base', ['componentData'])
  },
  methods: {
    getShapeStyle,
    getComponentStyle(style) {
      return getStyle(style, this.svgFilterAttrs)
    },
    handleMouseDown(e) {

    },
    handleContextMenu(e) {
      e.stopPropagation()
      e.preventDefault()

      // 计算菜单相对于编辑器的位移
      let target = e.target
      let top = e.offsetY
      let left = e.offsetX
      while (target instanceof SVGElement) {
        target = target.parentNode
      }

      while (!target.className.includes('editor')) {
        left += target.offsetLeft
        top += target.offsetTop
        target = target.parentNode
      }
      this.$store.commit('contextmenu/showContextMenu', {left, top})
    }
  },
  mounted() {
    // 获取编辑器元素
    this.$store.commit('compose/getEditor')
  }
}
</script>

<style scoped lang="scss">
.editor {
  position: relative;
  background-color: #fff;
  margin: auto;
}

.edit {
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>