<template>
  <div
      :style="{
            ...getCanvasStyle(canvasStyleData),
            width: changeStyleWithScale(canvasStyleData.width) + 'px',
            height: changeStyleWithScale(canvasStyleData.height) + 'px',
        }"
      id="editor"
      class="editor">
    <div
        v-for="(item, index) in componentData"
        :key="item.id"
    >
      <component
          :is="item.component"
          :id="`component${item.id}`"
          class="component"
          :prop-value="item.propValue"
          :element="item"
          :style="getComponentStyle(item.style)"
          :request="item.request"
      />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getStyle, getComponentRotatedStyle, getShapeStyle, getSVGStyle, getCanvasStyle} from '@/utils/style'
import {changeStyleWithScale} from '@/utils/translate'

export default {
  data() {
    return {
      svgFilterAttrs: ['width', 'height', 'top', 'left', 'rotate'],
    }
  },
  computed: mapState([
    'componentData',
    'curComponent',
    'canvasStyleData',
    'editor',
  ]),
  methods: {
    getCanvasStyle,
    changeStyleWithScale,
    getComponentStyle(style) {
      return getStyle(style, this.svgFilterAttrs)
    },

  }
}
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  background: #fff;
  margin: auto;

  .lock {
    opacity: .5;

    &:hover {
      cursor: not-allowed;
    }
  }
}

.edit {
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>