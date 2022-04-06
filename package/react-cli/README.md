## 基于 webpack 自定义 react-cli

### 修改 webpack 配置可以在你的项目目录下添加 `dwj.config.js`

### dwj.config.js
```js
const resolveApp = require('dwj-react-build/utils/paths')

module.exports = {
  entry: resolveApp('src/index.tsx'),
  devServer: {
    open: true
  }
}
```
