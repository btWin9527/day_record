# FilterableProductTable组件

> 产品展示应用，包含列表展示，搜索，其中列表展示需要进行分类显示

## 组件划分

1. FilterableProductTable (橙色): 是整个示例应用的整体
2. SearchBar (蓝色): 接受所有的用户输入
3. ProductTable (绿色): 展示数据内容并根据用户输入筛选结果
4. ProductCategoryRow (天蓝色): 为每一个产品类别展示标题
5. ProductRow (红色): 每一行展示一个产品

## 组件层级显示

+ FilterableProductTable
  + SearchBar
  + ProductTable
    + ProductCategoryRow
    + ProductRow

## 组件实现

1. 通过组件层级拆分组件
2. 区分状态组件和无状态组件
3. 数据流置于上层组件处理，单向数据流控制ui组件渲染
4. 功能实现完成，抽离自定义hooks优化代码