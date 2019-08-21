const path = require('path')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ prod }) => ({
  mode: prod ? 'production' : 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'vue-ish.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  devtool: prod ? 'source-map' : 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
})
