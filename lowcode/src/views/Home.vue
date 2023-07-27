<template>
  <div class="home">
    <!-- 工具栏 -->
    <Toolbar/>
    <main>
      <!-- 左侧组件列表 -->
      <section class="left">
        <!-- 所有组件列表 -->
        <ComponentList/>
        <!-- 已选组件列表 -->
        <RealTimeComponentList/>
      </section>
      <!-- 中间画布 -->
      <section class="center">
        <div
            class="content"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @mousedown="handleMouseDown"
            @mouseup="deselectCurComponent"
        >
          <Editor/>
        </div>
      </section>
      <!-- 右侧属性列表 -->
      <section class="right">

      </section>
    </main>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import ComponentList from '@/components/ComponentList'
import RealTimeComponentList from '@/components/RealTimeComponentList'
import Editor from '@/components/Editor/index'
import {deepCopy} from '@/utils/utils'
import componentList from '@/custom-component/component-list'
import generateID from '@/utils/generateID'
import { mapState } from 'vuex'
import { changeComponentSizeWithScale } from '@/utils/changeComponentsSizeWithScale'

export default {
  components: {
    Toolbar,
    ComponentList,
    RealTimeComponentList,
    Editor
  },
  computed: mapState([
    'componentData',
    'curComponent',
    'isClickComponent',
    'canvasStyleData',
    'editor',
  ]),
  methods: {
    /**
     * @method handleDrop 拖拽元素放置在目标元素上时触发的事件
     * @desc drop 事件在拖拽元素放置在目标元素上时触发
     * @param e
     */
    handleDrop(e) {
      // 默认情况下，无法将数据/元素放置到其他元素中。如果需要设置允许放置，必须阻止对元素的默认处理方式
      e.preventDefault()
      // 阻止事件冒泡，防止触发父元素的 drop 事件
      e.stopPropagation()
      const index = e.dataTransfer.getData('index')
      const rectInfo = this.editor.getBoundingClientRect()
      if (index) {
        const component = deepCopy(componentList[index])
        component.style.top = e.clientY - rectInfo.y
        component.style.left = e.clientX - rectInfo.x
        component.id = generateID()

        // 根据画面比例修改组件样式比例 https://github.com/woai3c/visual-drag-demo/issues/91
        changeComponentSizeWithScale(component)

        this.$store.commit('addComponent', { component })
        this.$store.commit('recordSnapshot')
      }
    },
    /**
     * @method handleDragOver 拖拽元素在目标元素上方移动时触发的事件
     * @desc dragover 事件是在拖拽元素在目标元素上方移动时触发的事件。它通常用于指定拖放操作中的放置目标
     * @param e
     */
    handleDragOver(e) {
      // 拖动元素在目标元素上方移动时会触发 dragover 事件。如果不阻止默认行为或调用 event.preventDefault()，拖动元素将不会被允许在目标元素上方放置
      e.preventDefault()
    },
    handleMouseDown(e) {
      e.stopPropagation()
    },
    deselectCurComponent(e) {
      if (!this.isClickComponent) {
        this.$store.commit('setCurComponent', { component: null, index: null })
      }
      // 0 左击 1 滚轮 2 右击
      if (e.button != 2) {
        this.$store.commit('hideContextMenu')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  background: #fff;

  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;

      & > div {
        overflow: auto;

        &:first-child {
          border-bottom: 1px solid #ddd;
        }
      }
    }

    .right {
      position: absolute;
      height: 100%;
      width: 288px;
      right: 0;
      top: 0;

      .el-select {
        width: 100%;
      }
    }

    .center {
      margin-left: 200px;
      margin-right: 288px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }

  .global-attr {
    padding: 10px;
  }
}
</style>