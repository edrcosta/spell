const path = require('path');

module.exports = {
  entry: [
    // '../dist/bundle.js',
    './hello-world.js',
  ],
  watch: true,
  optimization: {
    minimize: false
  },
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'dist/examples.bundle.js',
  },
};