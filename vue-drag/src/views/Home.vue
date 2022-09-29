<template>
  <div class="home">
    <!-- 顶部工具栏 -->
    <Toolbar/>
    <!-- 内容区 -->
    <main>
      <!-- 左侧列表 -->
      <section class="left">
        <!-- 可选组件区域 -->
        <ComponentList/>
        <!--
        已选区域
        修改指定组件层级和删除
         -->
        <!--        <RealTimeComponentList/>-->
      </section>

      <!-- 中间画布 -->
      <section class="center">
        <div
            style="height: 100%;"
            class="content"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @mousedown="handleMouseDown"
            @mouseup="deselectCurComponent">
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
import Editor from '@/components/Editor';
import Toolbar from "@/components/Toolbar";
import ComponentList from "@/components/ComponentList";
import componentList from '@/custom-component/component-list' // 左侧列表数据
import {deepCopy} from "@/utitls/utils";
import generateID from "@/utitls/generateID";
import {mapGetters} from 'vuex'

export default {
  components: {
    Toolbar,
    ComponentList,
    Editor
  },
  computed: {
    ...mapGetters('compose', ['editor'])
  },
  methods: {
    /**
     *
     * @param e
     * @description
     * 可拖动元素或选取的文本放置在目标区域时触发
     */
    handleDrop(e) {
      // 阻止模式行为
      e.preventDefault()
      // 阻止事件冒泡
      e.stopPropagation()
      // index为字符串类型
      const index = e.dataTransfer.getData('index')
      const rectInfo = this.editor.getBoundingClientRect()
      if (index) {
        // 设置当前组件的坐标位置
        const component = deepCopy(componentList[index])
        component.style.top = e.clientY - rectInfo.y
        component.style.left = e.clientX - rectInfo.x
        // 唯一id
        component.id = generateID()
        // todo:根据画面比例修改组件样式比例
        this.$store.commit('base/addComponent', {component})
        // todo:添加快照，用于ctrl+z撤回
      }
    },
    /**
     *
     * @param e
     * @description 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
     */
    handleDragOver(e) {
      e.preventDefault()
      // dataTransfer.dropEffect 控制在拖放操作中给用户的反馈，简言之就是控制拖动过程中显示的鼠标样式
      e.dataTransfer.dropEffect = 'copy';
    },
    handleMouseDown(e) {
      console.log(2)
    },
    deselectCurComponent(e) {
      console.log(3)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  background-color: #fff;
  // 内容区
  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;
      background-color: aquamarine;
    }

    .right {
      position: absolute;
      height: 100%;
      width: 288px;
      right: 0;
      top: 0;
      background-color: blanchedalmond;
    }

    .center {
      margin: 0 288px 0 200px;
      background-color: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;
    }
  }
}
</style>