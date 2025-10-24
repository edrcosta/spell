const path = require('path');

module.exports = {
    entry: [
        './src/index.js'
    ],
    watch: true,
    optimization: {
        minimize: false
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};
