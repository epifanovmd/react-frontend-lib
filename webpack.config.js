const path = require("path");
const nodeExternals = require("webpack-node-externals");

function createConfig(filename, configFile) {
  return {
    mode: "development",
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "lib"),
      filename,
      library: "react-frontend-lib",
      umdNamedDefine: true,
      libraryTarget: "umd",
      globalObject: "this",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    externals: [nodeExternals()],
    devtool: "eval",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            { loader: "babel-loader" },
            {
              loader: "ts-loader",
              options: {
                configFile,
              },
            },
          ],
        },
      ],
    },
  };
}

module.exports = [
  createConfig("index.cjs.js", "tsconfig.cjs.json"),
  createConfig("index.mjs.js", "tsconfig.mjs.json"),
];
