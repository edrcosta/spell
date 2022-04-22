const path = require('path');

module.exports = {
  entry: [
    './src/websocket.js',
    './src/audio.js',
    './src/sprite-loader.js',
    './src/canvas.js',
    './src/colission.js',
    './src/game-debugger.js',
    './src/game.js',
    './src/keyboard.js',
    './src/math.js',
    './src/memory-cache.js',
    './src/mouse.js',
    './src/sprite.js',
  ],
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};