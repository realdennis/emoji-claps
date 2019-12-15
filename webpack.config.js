const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  entry: "./src/emoji-claps.ts",
  output: {
    filename: "emoji-claps.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist"
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    host: "0.0.0.0",
    port: 3000
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"]
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true
      })
    ]
  }
};
