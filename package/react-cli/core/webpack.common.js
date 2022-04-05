const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const resolveApp = require('../utils/paths')

module.exports = function (env) {
  return {
    target: ['browserslist'],
    mode: 'development',
    entry: resolveApp('index.js'),
    output: {
      filename: 'bundle.js',
      path: resolveApp('dist')
    },
    resolve: {
      fallback: {
        path: require.resolve("path-browserify") 
      }
    },
    plugins: [
      new CleanWebpackPlugin()
    ]
  }
}
