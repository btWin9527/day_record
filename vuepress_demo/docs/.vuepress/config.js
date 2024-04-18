const path = require("path");
module.exports = {
  theme: "",
  title: "my ui库",
  palette: path.resolve(__dirname, "palette.styl"),
  base: "/",
  port: "8080",
  themeConfig: {
    // 显示标题页面层级嵌套深度，默认为1，会显示到h2标题
    sidebarDepth: 0,
    nav: [
      // 配置顶部导航栏
      {
        text: "首页",
        link: "/",
      },
      {
        text: "组件",
        link: "/pages/",
      },
    ],
    sidebar: {
      // 配置侧边栏部分
      "/pages/": [
        {
          title: "使用指南",
          collapsable: true,
          path: "/pages/",
        },
        {
          title: "基础组件",
          collapsable: false,
          children: [
            {
              title: "Button 按钮",
              path: "/pages/components/button",
            },
            {
              title: "Icon 图标",
              path: "/pages/components/icon",
            },
          ],
        },
      ],
    },

  },
  plugins: ["demo-container"], // 配置插件
};
