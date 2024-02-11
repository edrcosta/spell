const path = require('path');

module.exports = {
    entry: [
        './src/animation.js',
        './src/asset-loader.js',
        './src/audio.js',
        './src/canvas.js',
        './src/colision.js',
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
        './src/sprite.js',
        './src/timmer.js',
        './src/websocket.js',
        './src/window.js'
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
