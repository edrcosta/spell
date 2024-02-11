import Spell from '../../../src';

const FPS = 2;
const CANVAS_ID = 'game-canvas';
const ENGINE = 'opengl';

function gameLoop () {
    const randomColor = Spell.math.getRandomElement(['#fcd200', '#ed1e1e', '#8719d1']);
    const randomTransparency = Spell.math.getRandomNumber(0.1, 1);

    console.log(`Hello World each ${FPS} FPS, without IO blocking`, randomColor);

    Spell.canvas.setBackgroundColor(randomColor, randomTransparency);
}

// initialize spell
const game = Spell.initialize(CANVAS_ID, FPS, ENGINE);

// set the method that will run each frame
game.setGameLoop(gameLoop);
// start the loop
game.start();
