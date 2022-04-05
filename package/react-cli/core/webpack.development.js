module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: 'only',
    hot: true,
    port: 1209,
    open: false,
    compress: true, // 开启 gzip ，性能压缩
    historyApiFallback: true
  },
}
