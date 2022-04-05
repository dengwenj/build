const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  bail: false,
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: 'only',
    hot: true,
    port: 1209,
    open: false,
    compress: true, // 开启 gzip ，性能压缩
    historyApiFallback: true
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ]
}
