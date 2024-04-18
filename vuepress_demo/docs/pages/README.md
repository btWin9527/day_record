# 安装

## npm安装

推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```javascript
npm install dd-ui-library
npm install element-ui
npm install xe-utils vxe-table@legacy
```
## 快速上手
```javascript
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import DataDriverUI from 'dd-ui-library'
import 'dd-ui-library/dd-ui-library.css'
// 工具类
import CommonUtils from 'dd-ui-library/utils/index.js'

Vue.prototype.$CommonUtils = CommonUtils

Vue.use(VXETable);
Vue.use(ElementUI)
Vue.use(DataDriverUI);
```
