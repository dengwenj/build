const webpack = require('webpack')

const config = require('../core/webpack.common')

const compiler = webpack(config({
  production: true
}))

const runBuild = () => {
  console.log('Packing...')

  compiler.run((err, stats) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Packaged successfully...')
    // console.log(stats)
  })
}
runBuild()
