/* eslint-disable */
const { merge } = require('webpack-merge')

const resolveApp = require('../utils/paths')

module.exports = function (env) {
  console.log(env)
  return {
    entry: resolveApp('src/index.js'),
    output: {
      filename: 'bundle.js',
      path: resolveApp('dist')
    }
  }
}