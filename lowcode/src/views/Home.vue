<template>
  <div>
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
        <Editor />
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

export default {
  components: {
    Toolbar,
    ComponentList,
    RealTimeComponentList,
    Editor
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