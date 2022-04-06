const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const config = require('../core/webpack.common')({ development: true })

const compiler = webpack(config)
const devServerOptinos = { ...config.devServer }
const server = new WebpackDevServer(devServerOptinos, compiler)

const runServer = async () => {
  console.log('Starting server...')
  await server.start()
}
runServer()
