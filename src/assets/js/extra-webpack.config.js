const { EnvironmentPlugin } = require("webpack");

module.exports = {
  plugins: [
    new EnvironmentPlugin({
      API_URL: process.env.API_URL,
    }),
  ],
};
