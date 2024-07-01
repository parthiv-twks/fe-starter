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
          name: 'auth',
          filename: "remoteEntry.js",
          exposes: {
            './Router': './src/router',
          },
          shared: {
            ...deps,
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
