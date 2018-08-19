exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-html") {
    config.loader("null", {
      test: /p5/,
      loader: "null-loader",
    });
  }
};