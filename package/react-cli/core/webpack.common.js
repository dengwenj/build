const { merge } = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const resolveApp = require('../utils/paths')
const production = require('./webpack.production')
const development = require('./webpack.development')

const commonConfig = {
  target: ['browserslist'],
  entry: resolveApp('index.js'),
  output: {
    filename: 'js/bundle.js',
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
          }
        ]
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
        ]
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
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ],
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
    // runtimeChunk: 'single',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'react app for dengwj',
      template: resolveApp('public/index.html')
    }),
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
    new DefinePlugin({
      BASE_URL: '"./"'
    })
  ],
  performance: false
}

module.exports = function (env) {
  const isProduction = env.production
  const config = isProduction ? production : development
  process.env.NODE_ENV = isProduction ? 'production' : 'development'

  return merge(commonConfig, config)
}
