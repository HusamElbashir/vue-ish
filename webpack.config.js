const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'vueish.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
}
