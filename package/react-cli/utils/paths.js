const path = require('path')

const preProcess = process.env.preProcess

function resolveApp(relativePath) {
  return path.resolve(preProcess, relativePath)
}

module.exports = resolveApp
