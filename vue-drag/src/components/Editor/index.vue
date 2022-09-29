<template>
  <div id="editor" class="editor">
    <!-- 页面组件列表展示 -->
    <Shape
        v-for="(item, index) in componentData"
        :key="item.id"
        :index="index"
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
  </div>
</template>

<script>
import Shape from "@/components/Editor/Shape";
import {mapGetters} from "vuex";
import {getStyle} from "@/utitls/style";

export default {
  components: {
    Shape
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
    getComponentStyle(style) {
      return getStyle(style, this.svgFilterAttrs)
    },
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
</style>