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
          name: "container",
          filename: "remoteEntry.js",
          remotes: {
            mfeOne: "mfeOne@http://localhost:3001/remoteEntry.js",
            auth: "auth@http://localhost:3003/remoteEntry.js",
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
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
            "styled-components": {
              singleton: true,
              requiredVersion: deps["styled-components"],
            },
          },
        }),
      ],
    },
  },
});
