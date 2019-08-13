const path = require('path')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ prod }) => ({
  mode: prod ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    filename: 'vue-ish.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    plugins: [PnpWebpackPlugin],
  },
  devtool: prod ? 'source-map' : 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
})
