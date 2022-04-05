const { merge } = require('webpack-merge')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const resolveApp = require('../utils/paths')

module.exports = function (env) {
  console.log('evddddd');
  return {
    mode: 'production',
    entry: resolveApp('index.js'),
    output: {
      filename: 'bundle.js',
      path: resolveApp('dist')
    },
    // plugins: [
    //   new CleanWebpackPlugin()
    // ]
  }
}
