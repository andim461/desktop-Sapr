const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  target: 'electron-renderer',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'dist'),
  //   stats: {
  //     colors: true,
  //     chunks: false,
  //     children: false,
  //   },
  // },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    writeToDisk: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SAPR',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@stores': path.resolve(__dirname, 'src/stores/'),
    },
  },
};
