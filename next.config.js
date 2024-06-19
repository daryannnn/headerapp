const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
  reactStrictMode: false,

  webpack(config, { isServer }) {
    config.plugins.push(
        new NextFederationPlugin({
          name: 'header',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
              './AppBarComponent': 'src/components/AppBarComponent.tsx',
          },
          shared: {
              '@material-ui/styles': {
                  singleton: true,
                  requiredVersion: '*',
              },
              '@material-ui/core': {
                  singleton: true,
                  requiredVersion: '*',
              },
              '@emotion/core': {
                  singleton: true,
                  requiredVersion: '*',
              },
              '@emotion/styled': {
                  singleton: true,
                  requiredVersion: '*',
              },
              "@material-ui/private-theming": {
                  singleton: true,
                  requiredVersion: '*',
              },
          },
        })
    );
      config.devServer = {
          client: { overlay: { warnings: false } }
      }

    return config;
  },

    /*webpack: function (config, _) {
        config.devServer = {
            client: { overlay: { warnings: false } }
        }
        return config
    }*/
}

module.exports = nextConfig
