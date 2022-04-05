const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackplugin = require('compression-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const resolveApp = require('../utils/paths')

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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolveApp('public'),
          globOptions: {
            // 要忽略的文件
            ignore: [
              "**/index.html"
            ]
          }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css',
      chunkFilename: 'css/[name].[contenthash:6].chunk.css'
    }),
    new CompressionWebpackplugin({
      test: /\.(css|js)$/i
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime.*\.js/])
  ]
}
