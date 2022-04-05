const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackplugin = require('compression-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  bail: true,
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false
      }),
      new cssMinimizerWebpackPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css'
    }),
    new CompressionWebpackplugin({
      test: /\.(css|js)$/i
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime.*\.js/])
  ]
}
