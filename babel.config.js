module.exports = {
  presets: ["@babel/preset-typescript", "@babel/preset-react"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
      },
    ],
  ],
};
