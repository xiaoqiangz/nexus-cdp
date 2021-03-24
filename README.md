当前，CDP前端代码基于vue2.6+ + webpack4+，需要NodeJS(需下载稳定版)和NPM。
### 1。开发ENV设置：您可能需要一个IDE来管理大型项目，我们大多数人使用   WebStorm or vscode。
### 2。下载代码后：您将首先下载依赖项：
cd chinapex-manager

npm install

编辑代码后，您将必须编译代码以查看更改：

npm run serve

### 3。项目里配合使用eslint使代码更加规范，当然您可以安装Vetur插件自动格式化代码。

测试环境执行：

npm run build:test

生产环境

npm run build
