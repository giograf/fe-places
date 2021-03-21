const path = require("path");

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/' },
    src: { url: '/dist' },
  },
  plugins: [
    "@snowpack/plugin-postcss",
    "snowpack-plugin-less",
    [
      'snowpack-plugin-terser',
      {
        /**
         * @see Plugin Options below
         */
        terserOptions: {
          compress: {
            arguments: true,
            passes: 2,
            unsafe_arrows: true,
          },
        },
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  }
};
