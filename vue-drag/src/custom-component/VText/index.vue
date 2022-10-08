<template>
  <div
      v-if="editMode === 'edit'"
      class="v-text"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
  >
    <!--
    tabindex >=0 使得双击时聚焦该元素
    contenteditable 属性指定元素内容是否可编辑
     -->
    <div
        ref="text"
        :contenteditable="canEdit"
        :class="{ 'can-edit': canEdit }"
        tabindex="0"
        :style="{ verticalAlign: element.style.verticalAlign }"
        @dblclick="setEdit"
        @paste="clearStyle"
        @mousedown="handleMousedown"
        @blur="handleBlur"
        @input="handleInput"
        v-html="element.propValue"
    ></div>
  </div>
  <div v-else class="v-text preview">
    <div :style="{verticalAlign: element.style.verticalAlign}" v-html="element.propValue"></div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import request from "@/utitls/request"
import {keycodes} from "@/utitls/shortcutKey";
import OnEvent from "@/custom-component/common/OnEvent";
import eventBus from "@/utitls/eventBus";

export default {
  extends: OnEvent,
  props: {
    propValue: {
      type: String,
      required: true,
      default: '',
    },
    request: {
      type: Object,
      default: () => {
      },
    },
    element: {
      type: Object,
      default: () => {
      },
    },
    linkage: {
      type: Object,
      default: () => {
      },
    },
  },
  data() {
    return {
      canEdit: false,
      ctrlKey: 17,
      isCtrlDown: false,
      cancelRequest: null
    }
  },
  computed: {
    ...mapState('base', ['editMode', 'curComponent',])
  },
  methods: {
    onComponentClick() {
      // 如果当前点击的组件 id 和 VText 不是同一个，需要设为不允许编辑
      if (this.curComponent.id !== this.element.id) {
        this.canEdit = false
      }
    },
    handleInput(e) {
      this.$emit('input', this.element, e.target.innerHTML)
    },
    handleKeydown(e) {
      // 阻止冒泡，防止触发复制、粘贴组件操作
      this.canEdit && e.stopPropagation()
      if (e.keyCode === this.ctrlKey) {
        this.isCtrlDown = true
      } else if (this.isCtrlDown && this.canEdit && keycodes.includes(e.keyCode)) {
        e.stopPropagation()
      } else if (e.keyCode === 46) { // delete
        e.stopPropagation()
      }
    },
    handleKeyup(e) {
      // 阻止冒泡，防止触发复制、粘贴组件操作
      this.canEdit && e.stopPropagation()
      if (e.keyCode === this.ctrlKey) {
        this.isCtrlDown = false
      }
    },
    handleMousedown(e) {
      if (this.canEdit) {
        e.stopPropagation()
      }
    },
    clearStyle(e) {
      e.preventDefault()
      const clp = e.clipboardData
      // 从剪切板获取指定格式的数据 e.clipboardData.getData
      const text = clp.getData('text/plain') || ''
      if (text !== '') {
        navigator.clipboard.writeText(text);
      }
      this.$emit('input', this.element, e.target.innerHTML)
    },
    handleBlur(e) {
      this.element.propValue = e.target.innerHTML || '&nbsp;'
      const html = e.target.innerHTML
      if (html !== '') {
        this.element.propValue = e.target.innerHTML
      } else {
        this.element.propValue = ''
        this.$nextTick(() => {
          this.element.propValue = '&nbsp;'
        })
      }
      this.canEdit = false
    },
    // 初始化进行的操作
    initActions() {
      // 注意，修改时接口属性时不会发数据，在预览时才会发
      // 如果要在修改接口属性的同时发请求，需要 watch 一下 request 的属性
      if (this.request) {
        // 第二个参数是要修改数据的父对象，第三个参数是修改数据的 key，第四个数据修改数据的类型
        this.cancelRequest = request(this.request, this.element, 'propValue', 'string')
      }
      eventBus.$on('componentClick', this.onComponentClick)
    },
    // 组件卸载操作
    offActions() {
      // 组件销毁时取消请求
      this.request && this.cancelRequest()
      eventBus.$off('componentClick', this.onComponentClick)
    },
    setEdit() {
      if (this.element.isLock) return

      this.canEdit = true
      // 全选
      this.selectText(this.$refs.text)
    },
    selectText(element) {
      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(element)
      selection.removeAllRanges()
      selection.addRange(range)
    },
  },
  created() {
    this.initActions()
  },
  beforeDestroy() {
    this.offActions()
  }
}
</script>

<style lang="scss" scoped>
.v-text {
  width: 100%;
  height: 100%;
  display: table;

  div {
    display: table-cell;
    width: 100%;
    height: 100%;
    outline: none;
    word-break: break-all;
    padding: 4px;
  }

  .can-edit {
    cursor: text;
    height: 100%;
  }
}

.preview {
  user-select: none;
}
</style>
