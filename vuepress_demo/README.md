## dd-ui-library-doc 文档库

#### 项目地址

```javascript
项目地址：https://github.com/YolandaKisses/YolandaKisses.github.io
演示地址：https://yolandakisses.github.io/
```

#### 目录结构

```javascript
├─ docs
│  └─ .vuepress 
│	└─ config.js // 页面配置文件
│	└─ public // 静态资源
│	└─ enhanceApp.js // 引用外部资源
│	└─ styles // 样式文件
│  └─ pages 
│	└─ components // Element + Vxe相关组件
│	└─ echarts // echarts相关组件
│	└─ utils // 工具类
│	└─ README.md // 快速上手
│  └─ README.md // 首页
├─ .gitignore
└─ deploy.sh // 部署脚本文件
```

#### 首页修改

```javascript
/docs/README.md

---
home: true
heroImage: /header.png
heroText: 标题
tagline: 副标题
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: Copyright © xx
---
```

#### 页面配置文件

```javascript
docs/.vuepress/config.js

const path = require("path");
module.exports = {
  theme: "",
  title: "基于Vxe + ElementUI + Echarts业务组件库",
  palette: path.resolve(__dirname, "palette.styl"),
  base: "/",
  port: "8080",
  themeConfig: {
    nav: [
      // 配置顶部导航栏
      {
        text: "首页",
        link: "/"
      },
      {
        text: "组件",
        link: "/pages/"
      }
    ],
    sidebar: {
      // 配置侧边栏部分
      "/pages/": [
        {
          title: "使用指南",
          collapsable: true,
          path: "/pages/"
        },
        {
          title: "基于Element + Vxe",
          collapsable: true,
          children: [
            { title: "diff-table 表格差异化对比高亮展示", path: "/pages/components/diff-table.md" },
            { title: "multiple-select-table 带表格查询的下拉框", path: "/pages/components/multiple-select-table.md" },
            { title: "query-from 查询表单", path: "/pages/components/query-form.md" }
          ]
        },
        {
          title: "基于Echarts",
          collapsable: true,
          children: [{ title: "pie", path: "/pages/echarts/my-chart.md" }]
        },
        {
          title: "CommonUtils工具类",
          collapsable: true,
          children: [
            {
              title: "工具类方法调用",
              children: [
                { title: "Web Storage使用", path: "/pages/utils/methods/webStorage.md" },
                { title: "listToTree线性列表转树性列表", path: "/pages/utils/methods/listToTree.md" },
                {
                  title: "convertToDictLabel 根据指定值从字典数据中转换label",
                  path: "/pages/utils/methods/convertToDictLabel.md"
                },
                { title: "convertToOptions 转换成下拉数据", path: "/pages/utils/methods/convertToOptions.md" }
              ]
            },
            {
              title: "公共API接口",
              children: [
                { title: "getSqlDataBySqlCode 通用sqlCode接口", path: "/pages/utils/api/getSqlDataBySqlCode.md" },
                { title: "dictionaryList 获取数据字典数据", path: "/pages/utils/api/dictionaryList.md" }
              ]
            }
          ]
        }
      ]
    }
  },
  plugins: ["demo-container"] // 配置插件
};

```

#### 外部引用资源

```javascript
docs/.vuepress/enhanceApp.js

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import DataDriverUI from 'dd-ui-library'
import 'dd-ui-library/dd-ui-library.css'

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

export default async ({
  Vue
}) => {
  if (typeof process === 'undefined') {
    Vue.use(ElementUI)
    Vue.use(DataDriverUI)
    Vue.use(VXETable)
  }
}
```

#### 组件代码展开收起效果实现

```javascript
npm install vuepress-plugin-demo-container

module.exports = {
  // ...
  plugins: ['demo-container'], // 配置插件
  markdown: {}
}

md文件内使用demo语法包裹
::: demo 
::: 
```

#### 表格样式错乱问题解决方案

第一步：
找到 node_modules\@vuepress\theme-default\styles\index.styl
注释或删除以下代码：

```javascript
//  table
//    border-collapse collapse
//    margin 1rem 0
//    display: block
//    overflow-x: auto

//  tr
//    border-top 1px solid #dfe2e5

//    &:nth-child(2n)
//      background-color #f6f8fa

//  th, td
//    border 1px solid #dfe2e5
//    padding .6em 1em
```

第二步：
md文档表格外层要加个div包裹，且class=special_table；
例：

```javascript
<div class="special_table">

| 参数           | 说明           | 类型            | 可选值 | 默认值       |
| -------------- | ------------- | --------------- | ------ | ----------- |
| v-model        | 绑定值         | string          |    —   |       —     |
···

</div>
```

#### 自动化部署VuePress至github.io(请先配置ssh)

```javascript
根目录创建deploy.sh配置自动化部署脚本

# 忽略错误
set -e

# 打包
npm run docs:build

# 进入待发布的目录
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy page'

# 如果部署到 https://<USERNAME>.github.io
git push -f git@github.com:YolandaKisses/YolandaKisses.github.io.git master

cd -
```

```javascript
配置scripts打包命令
"docs:build": "vuepress build docs"

配置scripts脚本命令
"deploy": "bash deploy.sh"

一、git bash中 npm run deploy

直接执行npm run deploy 如果git bash中报关于node错误则选用第二步

二、项目更新部署步骤
1. npm run docs:build /.vuepress下生成dist文件，每次更新需替换dist
2. 在项目目录下打开git bash
3. 执行npm run deploty 运行脚本成功后自动部署到github
```
