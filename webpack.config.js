const path = require('path');

module.exports = {
  entry: [
    './src/audio.js',
    './src/canvas.js',
    './src/animation.js',
    './src/colision.js',
    './src/firebase.js',
    './src/game-debugger.js',
    './src/game.js',
    './src/index.js',
    './src/keyboard.js',
    './src/levels.js',
    './src/map-system.js',
    './src/math.js',
    './src/memory-cache.js',
    './src/mouse.js',
    './src/opengl.js',
    './src/performance.js',
    './src/rendering.js',
    './src/spell.js',
    './src/sprite-loader.js',
    './src/sprite.js',
    './src/timmer.js',
    './src/websocket.js',
    './src/window.js',
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