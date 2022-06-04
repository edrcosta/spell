const path = require('path');

module.exports = {
  entry: [
    // '../dist/bundle.js',


    '../examples/hello-world.js',
  ],
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'examples.bundle.js',
  },
};