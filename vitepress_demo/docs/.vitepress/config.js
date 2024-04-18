export default {
  title: 'UV-UI',
  base: '/uv-ui/',
  outDir: './dist',
  lastUpdated: true,
  themeConfig: {
    logo: 'https://gitee.com/monsterwx/uv-ui/raw/master/docs/logo.png',
    search: {
      provider: 'local'
    },
    docsDir: 'docs',
    outline: false, // 大纲
    socialLinks: [
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Monster'
    },
    nav: [
      {text: '指南', link: '/guide/installation', activeMatch: '/guide/'},
      {text: '组件', link: '/component/button', activeMatch: '/component/'}
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            {text: '安装', link: '/guide/installation'},
            {text: '快速开始', link: '/guide/quickStart'},
            {text: '更新日志', link: '/guide/CHANGELOG'}
          ]
        }
      ],
      '/component/': [
        {
          text: '基础组件',
          collapsed: false,
          items: [
            {text: 'Button 按钮', link: '/component/button'},
            {text: 'Icon 图标', link: '/component/icon'},
          ]
        },
      ]
    }
  }
}
