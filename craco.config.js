const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

// craco.config.js
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig, { env, paths }) => {
      console.log("::: process.env.NODE_ENV", process.env.REACT_APP_BUILD_ENV);
      // Remove hash from file names
      webpackConfig.output.filename = "static/js/main.js";
      webpackConfig.output.chunkFilename = "static/js/[name].chunk.js";
      // Update CSS file name
      const cssPlugin = webpackConfig.plugins.find(
        (plugin) => plugin.constructor.name === "MiniCssExtractPlugin"
      );
      if (cssPlugin) {
        cssPlugin.options.filename = "static/css/main.css";
        cssPlugin.options.chunkFilename = "static/css/[name].chunk.css";
      }

      if (process.env.REACT_APP_BUILD_ENV === "development") {
        webpackConfig.optimization.minimizer = [
          new TerserPlugin({
            terserOptions: {
              compress: false,
              mangle: false,
              output: {
                comments: true,
                beautify: true,
              },
            },
          }),
        ];

        // Configure TypeScript loader
        const tsRule = webpackConfig.module.rules.find(
          (rule) => rule.test && rule.test.toString().includes("ts|tsx")
        );
        if (tsRule && tsRule.use) {
          const tsLoader = tsRule.use.find(
            (loader) => loader.loader && loader.loader.includes("ts-loader")
          );
          if (tsLoader) {
            tsLoader.options = {
              ...tsLoader.options,
              compilerOptions: {
                ...tsLoader.options?.compilerOptions,
                removeComments: false,
                noEmitOnError: false,
                module: "esnext",
                target: "es2015",
              },
            };
          }
        }
      }

      return webpackConfig;
    },
  },
};
