<template>
  <div class="component-list" @dragstart="handleDragStart">
    <div
        v-for="(item,index) in componentList"
        :key="index"
        class="list"
        draggable
        :data-index="index">
      <span class="iconfont" :class="'icon-'+item.icon"></span>
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
     * @method 开始拖拽事件
     * @param e 时间对象e
     * @description
     *  DataTransfer对象专门用来存储拖放时需要携带的数据， 可以被设置为拖放事件对象的DataTransfer属性
     *  setData有两个参数
     *  1.第一个参数为携带数据的数据种类的字符串，只能填入类 似“text/plain”或“textml”的表示 MIME类型的文字
     *  2. 第二个参数为要携带的数据
     *
     *  目标元素使用getData（）方法
     * (1).目标元素接受到被拖放的元素后，执行getData()方法从DataTransfer里获取数据
     * (2).getData()方法的参数为setData()方法中指定的数据类型
     *
     */
    handleDragStart(e) {
      e.dataTransfer.setData('index', e.target.dataset.index)
    }
  }
}
</script>

<style scoped lang="scss">
.component-list {
  height: 65%;
  padding: 10px;
  display: grid;
  grid-gap: 10px 19px;
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