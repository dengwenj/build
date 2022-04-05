/* eslint-disable */
const path = require('path')

function resolveApp(relativePath) {
  return path.resolve(process.cwd(), relativePath)
}

module.exports = resolveApp
