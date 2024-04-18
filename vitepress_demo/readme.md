# vitepress项目

> vitepress 要求使用node 18.xx.xx版本安装依赖及启动
> 
> [官方文档](https://vitejs.cn/vitepress/guide/deploy.html#%E6%9E%84%E5%BB%BA%E6%96%87%E6%A1%A3)

## 1. 依赖安装及启动

**安装依赖**

```shell
# 如果当前环境是node 16.xx.xx版本，可以安装低版本的pnpm安装vitepress
npm i -g pnpm@7.26.2
pnpm i

# 如果node是18.xx版本，直接npm i安装
npm i
```
**启动项目及打包**

```shell
# 启动项目
npm run dev:docs

# 打包项目，会在.vitepress/dist生成资源
npm run build:docs

```

**项目部署**

> serve 命令会启动一个本地静态web服务器，该服务器提供访问.vitepress/dist中文件的服务。

```shell
# 测试构建文档
npm run docs:serve
```

## 2. 配置文档菜单

> 在`docs/.vitepress/config.js`文件中配置文档菜单及主题信息

## 3. 项目目录

```text
 docs
  ├─index.md                首页文档信息
  ├─logo.png
  ├─package.json
  ├─store
  |   └copname.js           存储路由名称
  ├─iframe
  |   └UvUI.vue             扩展自定义主题
  ├─hooks
  |   └useUpdateRoute.js    封装更新路由名称
  ├─guide                   引导页文档
  |   ├─CHANGELOG.md
  |   ├─installation.md
  |   └quickStart.md
  ├─component               组件页文档
  |     ├─.DS_Store
  |     ├─button.md
  |     └icon.md
  └.vitepress               vitepress配置
        ├─.DS_Store
        ├─config.js          文档主题及菜单配置
        └theme              自定义主题
           ├─index.js
           └styles
              └vars.css

```
