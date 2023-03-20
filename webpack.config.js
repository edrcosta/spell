const path = require('path');

module.exports = {
  entry: [
    // './src/animation.js',
    // './src/websocket.js',
    './src/audio.js',
    './src/window.js',
    './src/sprite-loader.js',
    './src/colision.js',
    './src/opengl.js',
    './src/rendering.js',
    './src/canvas.js',
    './src/game-debugger.js',
    './src/game.js',
    './src/keyboard.js',
    './src/math.js',
    './src/memory-cache.js',
    './src/mouse.js',
    './src/sprite.js',
    './src/spell.js',
  ],
  watch: true,
  optimization: {
    minimize: false
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};