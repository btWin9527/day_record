<!-- 画布渲染页面组件 -->
<template>
  <div
      @click="selectCurComponent"
      @mousedown="handleMouseDownOnShape"
      :class="{ active }"
      class="shape">
    <span v-show="isActive" class="iconfont icon-xiangyouxuanzhuan" @mousedown="handleRotate"></span>
    <span v-show="element.isLock" class="iconfont icon-suo"></span>
    <div
        v-for="item in (isActive ? getPointList : [])"
        :key="item"
        class="shape-point"
        :style="getPointStyle(item)"
        @mousedown="handleMouseDownOnPoint(item, $event)"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import {isPreventDrop} from "@/utitls/utils";
import eventBus from "@/utitls/eventBus";
import {mapGetters} from "vuex";
import {mod360} from "@/utitls/translate"
import runAnimation from "@/utitls/runAnimation";
import calculateComponentPositonAndSize from "@/utitls/calculateComponentPositonAndSize";
import {
  pointList,
  pointList2,
  initialAngle,
  angleToCursor,
  generatePointStyle,
  generateCursor
} from "@/components/Editor/generateConfig";

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
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
  data() {
    return {
      // 八个方向
      pointList,
      // 左右两个方向
      pointList2,
      cursors: {},
      initialAngle,
      angleToCursor,
    }
  },
  computed: {
    isActive() {
      return this.active && !this.element.isLock
    },
    getPointList() {
      return this.element.component === 'line-shape' ? this.pointList2 : this.pointList
    },
    isNeedLockProportion() {
      if (this.element.component !== 'Group') return false
      const ratates = [0, 90, 180, 360]
      for (const component of this.element.propValue) {
        if (!ratates.includes(mod360(parseInt(component.style.rotate)))) return true
      }
      return false
    },
    ...mapGetters('compose', ['editor']),
    ...mapGetters('base', ['curComponent'])
  },
  methods: {
    // 处理旋转
    handleRotate(e) {

    },
    // 获取样式样式
    getPointStyle(point) {
      const {width, height} = this.defaultStyle
      return generatePointStyle({point, width, height, cursors: this.cursors})
    },
    // 鼠标在当前组件按下事件
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
      if (this.element.isLock) return
      this.cursors = this.getCursor() // 根据旋转角度获取光标位置
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
        hasMove && this.$store.dispatch('snapshot/recordSnapshot')
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
    // 处理鼠标按下事件
    handleMouseDownOnPoint(point, e) {
      this.$store.commit('base/setInEditorStatus', true)
      this.$store.commit('base/setClickComponentStatus', true)
      e.stopPropagation()
      e.preventDefault()
      const style = {...this.defaultStyle}
      // 组件宽高比
      const proportion = style.width / style.height

      // 组件中心点
      const center = {
        x: style.left + style.width / 2,
        y: style.top + style.height / 2,
      }

      // 获取画布位置信息
      const editorRectInfo = this.editor.getBoundingClientRect()
      // 获取point与实际拖动基准点的差值
      const pointRect = e.target.getBoundingClientRect()
      const curPoint = {
        x: Math.round(pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2),
        y: Math.round(pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2)
      }

      // 获取对称点的坐标
      const symmetricPoint = {
        x: center.x - (curPoint.x - center.x),
        y: center.y - (curPoint.y - center.y)
      }
      const paramsInfo = {center, style, editorRectInfo, point, proportion, curPoint, symmetricPoint}
      this.bindPointMouseEvent(paramsInfo)

    },
    // 绑定缩放点鼠标移动事件
    bindPointMouseEvent(paramsInfo) {
      let {center, style, editorRectInfo, point, proportion, curPoint, symmetricPoint} = paramsInfo
      // 是否需要保存快照
      let needSave = false
      let isFirst = true
      const needLockProportion = this.isNeedLockProportion

      const move = (moveEvent) => {
        // 第一次点击时也会触发move,则会有"刚点击组件但未移动，组件的大小却改变了"的情况发生
        // 因此第一次点击不触发move事件
        if (isFirst) return isFirst = false
        needSave = true
        const curPosition = {
          x: moveEvent.clientX - Math.round(editorRectInfo.left),
          y: moveEvent.clientY - Math.round(editorRectInfo.top)
        }
        calculateComponentPositonAndSize(point, style, curPosition, proportion, needLockProportion, {
          center,
          curPoint,
          symmetricPoint,
        })
        this.$store.commit('base/setShapeStyle', style)
      }
      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        needSave && this.$store.dispatch('snapshot/recordSnapshot')
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
    // 获取光标样式
    getCursor() {
      const {angleToCursor, initialAngle, pointList, curComponent} = this
      let params = {angleToCursor, initialAngle, pointList, curComponent}
      return generateCursor(params)
    },
    // 初始化操作
    initActions() {
      if (this.curComponent) {
        this.cursors = this.getCursor() //  根据旋转角度获取光标位置
        eventBus.$on('runAnimation', () => {
          if (this.element === this.curComponent) {
            runAnimation(this.$el, this.curComponent.animations)
          }
        })
        eventBus.$on('stopAnimation', () => {
          this.$el.classList.remove('animated', 'infinite')
        })
      }
    },
  },
  mounted() {
    this.initActions()
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

.active {
  outline: 1px solid #70c0ff;
  user-select: none;
}

.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}

.icon-xiangyouxuanzhuan {
  position: absolute;
  top: -34px;
  left: 50%;
  transform: translateX(-50%);
  cursor: grab;
  color: #59c7f9;
  font-size: 20px;
  font-weight: 600;

  &:active {
    cursor: grabbing;
  }
}

.icon-suo {
  position: absolute;
  top: 0;
  right: 0;
}
</style>