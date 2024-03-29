const fs = require('fs')
const { merge } = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgeCSSWebpackPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')

const resolveApp = require('../utils/paths')
const production = require('./webpack.production')
const development = require('./webpack.development')

const existsDwjConfig = () => {
  const dwjConfigpath = process.env.preProcess + '/dwj.config.js'
  if (fs.existsSync(dwjConfigpath)) return require(dwjConfigpath)
}

const commonConfig = (isProduction) => {
  return {
    target: ['browserslist'],
    entry: resolveApp('src/index.js'),
    output: {
      filename: 'js/[name].[chunkhash:6].bundle.js',
      chunkFilename: 'js/[name].[contenthash:6].chunk.js',
      path: resolveApp('dist'),
      publicPath: '/'
    },
    resolve: {
      fallback: {
        path: require.resolve("path-browserify") 
      },
      extensions: ['.js', '.ts', '.json', '.jsx', '.tsx'],
      alias: {
        '@': resolveApp('src')
      }
    },
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('postcss-preset-env')
                  ]
                }
              }
            }
          ],
          sideEffects: true
        },
        {
          test: /\.less$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('postcss-preset-env')
                  ]
                }
              }
            },
            'less-loader'
          ],
          sideEffects: true
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          type: 'asset',
          generator: {
            filename: 'img/[name].[hash:6][ext]'
          },
          parser: {
            dataUrlCondition: {
              maxSize: 100 * 1024
            }
          }
        },
        {
          test: /\.(woff|eot|ttf|woff2)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'font/[name].[hash:6][ext]'
          }
        },
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            filename: 'js/[id]_vendors.js',
            priority: -10
          },
        }
      },
      runtimeChunk: 'single',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'react app for dengwj',
        template: resolveApp('public/index.html'),
        minify: isProduction ? {
          removeComments: true,
          removeRedundantAttributes: true, 
          removeEmptyAttributes: true, 
          collapseWhitespace: true,
          minifyCSS: true, 
          minifyJS: {
            mangle: {
              toplevel: true 
            }
          }
        } : false
      }),
      new DefinePlugin({
        BASE_URL: '"./"'
      }),
      // 对 css tree shaking
      new PurgeCSSWebpackPlugin({
        paths: glob.sync(`${resolveApp('src')}/**/*`, { nodir: true }),
        safelist() {
          return {
            standard: ['body', 'html']
          }
        }
      })
    ],
    performance: false
  }
}

module.exports = function (env) {
  const isProduction = env.production
  const config = isProduction ? production : development
  process.env.NODE_ENV = isProduction ? 'production' : 'development'

  return merge(commonConfig(isProduction), config, existsDwjConfig() || {})
}
