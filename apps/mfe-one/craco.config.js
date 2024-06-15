const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies;

module.exports = () => ({
  webpack: {
    configure: {
      output: {
        publicPath: "auto",
      },
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "mfeOne",
          filename: "remoteEntry.js",
          exposes: {
            "./Card": "./src/Card",
          },
          shared: {
            ...deps,
            // card: {
            //   singleton: true,
            // },
            // "movies-content": {
            //   singleton: true,
            // },
            // "playlist-content": {
            //   singleton: true,
            // },
            // tsconfig: {
            //   singleton: true,
            // },
            // ui: {
            //   singleton: true,
            // },
            // store: {
            //   singleton: true,
            // },
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            "styled-components": {
              singleton: true,
              requiredVersion: deps["styled-components"],
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
          },
        }),
      ],
    },
  },
});
