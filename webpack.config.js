const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
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
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
  },
  devtool: "source-map",
  plugins: [],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" },
          {
            loader: "ts-loader",
            options: { happyPackMode: true },
          },
        ],
      },
    ],
  },
};
