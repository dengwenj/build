const presets = [
  ['@babel/preset-env'],
  ['@babel/preset-react'],
  ['@babel/preset-typescript']
]

const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(['react-refresh/babel'])
}

module.exports = {
  presets,
  plugins
}
