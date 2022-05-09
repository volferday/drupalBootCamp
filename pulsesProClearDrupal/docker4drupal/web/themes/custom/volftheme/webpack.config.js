const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const config = {
  entry: {
    index: path.join(__dirname, './src', 'bundle.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/': {
        // index: '',
        context: () => true,
        target: 'http://pulses.pro.localhost:8000/',
        changeOrigin: false,
        publicPath: path.join(__dirname, 'dist'),
        secure: false,
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].style.css",
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      }
    ]
  }
}
module.exports =(env, argv) => {
  if (argv.mode === 'development') {
    config.mode = "development";
    config.watch = true;
  }
  if (argv.mode === 'production') {
    config.mode = "production";
    config.optimization = {
      minimizer: [
        new CssMinimizerPlugin(),
      ],
        minimize: true,
    }
  }
  return config;
}
