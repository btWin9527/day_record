# vue-drage

## 1. 项目基础配置

**依赖安装**

```shell
npm i vue-router vuex
```

**路由和vuex配置**

> 省略...

## 2. 页面布局

```text
├── 内容区   main               
│   ├── 左侧列表                
│   ├── 中间画布            
│   └── 右侧属性             
├── 顶部工具栏   Toolbar

```

## 3. 拖拽数据流

> 拖拽过程中，传递数据使用的是DataTransfer来实现数据的设置和获取,
> DataTransfer对象专门用来存储拖放时要携带的数据，它可以被设置为拖放事件对象的DataTransfer属性。—把拖动的数据存入其中

**setData有两个参数：**

1. 第一个参数为携带数据的数据种类的字符串，只能填入类 似“text/plain”或“textml”的表示 MIME类型的文字
2. 第二个参数为要携带的数据

目标元素使用getData（）方法
(1).目标元素接受到被拖放的元素后，执行getData()方法从DataTransfer里获取数据
(2).getData()方法的参数为setData()方法中指定的数据类型

```vue

<template>
<span
    v-else
    :title="item.cameraName"
    class="tree-span"
    draggable="true"
    @dragstart="drag($event, item)"
></span>
</template>
<script>
export default {
  //组件一：（传递数据的组件）
  drag(e, item) {
    e.dataTransfer.setData("deviceId", item.id);
    e.dataTransfer.setData("playOutputUrl", item.playOutputUrl);
  },
//组件二 （接收数据的组件）
  drop(e, item) {
    let deviceId = e.dataTransfer.getData("deviceId");
    let playOutputUrl = e.dataTransfer.getData("playOutputUrl");
  }
}
</script>
```

