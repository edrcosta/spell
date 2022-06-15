import SpellGame from "../src/game";

const FPS = 30;
const canvasId = 'hello-world';

const HELLO_WORLD = ({ isFirstFrame, canvas, game }) => {
    canvas.setBackgroundColor('red')
}

const JumpGame = new SpellGame(canvasId, FPS)

JumpGame.setGameLoop(HELLO_WORLD)