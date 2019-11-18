var path = require('path');
const HtmpWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const niviewPath = path.resolve('../niview/src/assets');
const prodPath = path.resolve(__dirname, 'dist/assets');

module.exports = (env, argv) => {
  return {
    entry: { main: './src/index.js' },
    output: {
      path: argv.mode === 'development' ? niviewPath : prodPath,
      filename: 'default.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' }
        }, {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        }, {
          test: /\.scss$/,
          use: [
            { loader: "style-loader" },
            { loader: MiniCssExtractPlugin.loader },
            { loader: "css-loader" },
            { loader: "sass-loader" }
          ]
        }
      ]
    },
    plugins: [
      new HtmpWebPackPlugin({
        path: argv.mode === 'development' ? niviewPath : prodPath,
        filename: 'default.html',
        template: 'src/template/main.html',
        inject: true,
        hash: false
      }),
      new MiniCssExtractPlugin({
        filename: 'default.css',
        outputPath: argv.mode === 'development' ? niviewPath : prodPath
      })
    ],
    devServer: {
      contentBase: argv.mode === 'development' ? niviewPath : prodPath,
      compress: true,
      watchContentBase: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      },
      disableHostCheck: true, // Use only in localhost, to avoid Invalid Host/Origin header
      cert: './localhost.pem',  // To generate, refer step#2 @ https://github.com/nesign/niview#steps
      key: './localhost-key.pem',  // To generate, refer step#2 @ https://github.com/nesign/niview#steps
      https: true // https://stackoverflow.com/a/49784278
    }
  }
}