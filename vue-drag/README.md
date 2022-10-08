# vue-drag

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

## 4. 实现组件拖拽到画布显示

1. 实现自定义组件，用于拖拽选择 
   1. 自定义组件需要全局注册
   2. 样式需要支持配置默认样式和外部样式传入显示（component-list.js）

2. 实现画布区域，用于放置显示拖拽过来的组件
   1. 画布上显示的组件数据，存储在vuex管理
   2. 拖拽后的组件位置，通过坐标计算得到，控制行内样式显示在画布上


## 5. 实现组件在画布中移动

> 主要是通过`mousedown`, `mouseup`, `mousemove`三个事件，计算坐标位置偏移量，重新设置当前组件的位置样式

1. mousedown 事件，在组件上按下鼠标时，记录组件当前的位置，即 xy 坐标
2. mousemove 事件，每次鼠标移动时，都用当前最新的 xy 坐标减去最开始的 xy 坐标，从而计算出移动距离，再改变组件位置
3. mouseup 事件，鼠标抬起时结束移动

```js
handleMouseDown(e) {
    e.stopPropagation()
    this.$store.commit('setCurComponent', { component: this.element, zIndex: this.zIndex })

    const pos = { ...this.defaultStyle }
    const startY = e.clientY
    const startX = e.clientX
    // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
    const startTop = Number(pos.top)
    const startLeft = Number(pos.left)

    const move = (moveEvent) => {
        const currX = moveEvent.clientX
        const currY = moveEvent.clientY
        pos.top = currY - startY + startTop
        pos.left = currX - startX + startLeft
        // 修改当前组件样式
        this.$store.commit('setShapeStyle', pos)
    }

    const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
}
```

## 6. 删除组件，调整组件层级

> 由于拖拽组件到画布中是有先后顺序的，所以可以按照数据顺序来分配图层层级。删除组件非常简单，一行代码搞定：componentData.splice(index, 1

## 7. 放大缩小

> 在组件周围分布8个小圆点，点击组件时进行放大缩小（类似ps操作）

**todo**

2. https://github.com/woai3c/Front-end-articles/issues/19