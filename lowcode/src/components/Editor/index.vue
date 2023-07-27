<template>
  <div
      :style="{
            ...getCanvasStyle(canvasStyleData),
            width: changeStyleWithScale(canvasStyleData.width) + 'px',
            height: changeStyleWithScale(canvasStyleData.height) + 'px'
        }"
      @mousedown="handleMouseDown"
      @contextmenu="handleContextMenu"
      id="editor"
      class="editor">
    <Shape
        v-for="(item, index) in componentData"
        :key="item.id"
        :default-style="item.style"
        :style="getShapeStyle(item.style)"
        :active="item.id === (curComponent || {}).id"
        :element="item"
        :index="index"
        :class="{ lock: item.isLock }"
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
    </Shape>
    <!-- 右击菜单 -->
    <ContextMenu/>
    <!-- 选中区域 -->
    <Area
        v-show="isShowArea"
        :start="start"
        :width="width"
        :height="height"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getStyle, getComponentRotatedStyle, getShapeStyle, getSVGStyle, getCanvasStyle} from '@/utils/style'
import {changeStyleWithScale} from '@/utils/translate'
import Shape from './Shape'
import Area from "@/components/Editor/Area.vue";
import {isPreventDrop} from "@/utils/utils";
import ContextMenu from './ContextMenu'

export default {
  components: {
    Shape,
    Area,
    ContextMenu
  },
  data() {
    return {
      svgFilterAttrs: ['width', 'height', 'top', 'left', 'rotate'],
      editorX: 0,
      editorY: 0,
      start: { // 选中区域的起点
        x: 0,
        y: 0,
      },
      width: 0,
      height: 0,
      isShowArea: false,
    }
  },
  computed: mapState([
    'componentData',
    'curComponent',
    'canvasStyleData',
    'editor',
  ]),
  mounted() {
    // 获取编辑器元素
    this.$store.commit('getEditor')
  },
  methods: {
    getCanvasStyle,
    getShapeStyle,
    changeStyleWithScale,
    getComponentStyle(style) {
      return getStyle(style, this.svgFilterAttrs)
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

      this.$store.commit('showContextMenu', { top, left })
    },
    /**
     * @method handleMouseDown 鼠标按下事件
     * @desc 处理组件在画布移动
     * @param e
     */
    handleMouseDown(e) {
      // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
      if (!this.curComponent || (isPreventDrop(this.curComponent.component))) {
        e.preventDefault()
      }

      this.hideArea()

      // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
      const rectInfo = this.editor.getBoundingClientRect()
      this.editorX = rectInfo.x
      this.editorY = rectInfo.y

      const startY = e.clientY
      const startX = e.clientX
      this.start.x = startX - this.editorX
      this.start.y = startY - this.editorY
      // 展示选中区域
      this.isShowArea = true

      const move = (moveEvent) => {
        this.width = Math.abs(moveEvent.clientX - startX)
        this.height = Math.abs(moveEvent.clientY - startY)
        if (moveEvent.clientX < startX) {
          this.start.x = moveEvent.clientX - this.editorX
        }

        if (moveEvent.clientY < startY) {
          this.start.y = moveEvent.clientY - this.editorY
        }
      }

      const up = (e) => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)

        if (e.clientX == startX && e.clientY == startY) {
          this.hideArea()
          return
        }

        // this.createGroup()
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
    hideArea() {
      this.isShowArea = 0
      this.width = 0
      this.height = 0

      this.$store.commit('setAreaData', {
        style: {
          left: 0,
          top: 0,
          width: 0,
          height: 0,
        },
        components: [],
      })
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