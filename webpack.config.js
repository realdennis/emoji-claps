const path = require("path");
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
    port: 9000
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"]
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }]
  }
};
