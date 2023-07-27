<template>
  <div class="component-list" @dragstart="handleDragStart">
    <div
        v-for="(item, index) in componentList"
        :key="index"
        class="list"
        draggable
        :data-index="index">
      <!-- 区分是使用的el图标还是自定义iconfont图标 -->
      <span v-if="item.icon.substr(0,2) === 'el'" :class="item.icon"></span>
      <span v-else class="iconfont" :class="`icon-${item.icon}`"></span>
    </div>
  </div>
</template>

<script>
import componentList from '@/custom-component/component-list'

export default {
  data() {
    return {
      componentList
    }
  },
  methods: {
    /**
     * @desc 拖拽开始
     * @param e
     */
    handleDragStart(e) {
      // e.dataTransfer是拖拽数据传输对象，setData()方法用于设置数据传输对象中的数据
      e.dataTransfer.setData('index', e.target.dataset.index)
    }
  }
}
</script>

<style scoped lang="scss">
.component-list {
  height: 65%;
  padding: 10px;
  // grid为网格布局，grid-gap为网格间隙
  display: grid;
  // css gap属性用于指定网格行和列之间的间隔，该属性是grid-row-gap和grid-column-gap属性的简写形式。
  grid-gap: 10px 19px;
  // grid-template-columns属性定义了网格列的数量、宽度和类型，允许使用多个值来定义网格的列。
  // repeat()函数表示重复，auto-fill表示自动填充，80px表示每个网格的宽度
  grid-template-columns: repeat(auto-fill, 80px);
  grid-template-rows: repeat(auto-fill, 40px);

  .list {
    width: 80px;
    height: 40px;
    border: 1px solid #ddd;
    cursor: grab;
    text-align: center;
    color: #333;
    padding: 2px 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
      cursor: grabbing;
    }

    .iconfont {
      margin-right: 4px;
      font-size: 20px;
    }

    .icon-wenben,
    .icon-biaoge {
      font-size: 18px;
    }

    .icon-tupian {
      font-size: 16px;
    }
  }
}
</style>