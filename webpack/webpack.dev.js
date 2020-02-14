const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = () => {
  const options = {
    entry: './src/bootstrap.tsx',
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.bundle.js',
      chunkFilename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
          ]
        },
        {
          test: /\.less$/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "less-loader" // compiles Less to CSS
          }]
        },
        {
          test:/\.(png|jpg|gif)/ ,
          use:[{
              loader:'url-loader',
              options:{
                  limit:500000
              }
          }]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@layouts': path.resolve(__dirname, './src/layouts')
      }
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 8888
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../template.html'),
        hash: true
      }),
    ]
  };
  return options;
};