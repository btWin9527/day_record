# typora_note

> 笔记目录

```text
  '|-- typora_note',
  '    |-- .gitignore',
  '    |-- package-lock.json',
  '    |-- package.json',
  '    |-- README.md',
  '    |-- develop',
  '    |   |-- 20210121_statistics_page_dwelltime.md',
  '    |-- interview_point',
  '    |   |-- 20210122_js_basic.md',
  '    |-- reg_expr',
  '        |-- index.md',
```



## 目录生成方法

```shell
# 1. 下载依赖
npm install mddir --save
# 2. 进入node_modules/mddir/src 
cd node_modules/mddir/src
# 3. 运行node命令
node mddir "../../../"
# 补充：导出的目录可以在cmd复制或在node_modules/mddir/src/directoryList.md复制
```

