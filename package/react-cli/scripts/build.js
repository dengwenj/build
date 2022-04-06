const webpack = require('webpack')

const config = require('../core/webpack.common')

const compiler = webpack(config({
  production: true
}))

compiler.run((err, stats) => {
  if (err) {
    console.log(err)
    return
  }
  // console.log(stats)
})
