module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Suppress source map warnings
      webpackConfig.ignoreWarnings = [
        /Failed to parse source map/,
        /Module Warning \(from \.\/node_modules\/source-map-loader/,
      ];
      return webpackConfig;
    },
  },
}; 