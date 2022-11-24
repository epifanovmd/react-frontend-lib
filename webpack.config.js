const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    lib: "./src/index.ts",
    "lib.min": "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "_bundles"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "react-frontend-lib",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devtool: "source-map",
  plugins: [],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
      },
    ],
  },
};
