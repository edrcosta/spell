import SpellGame from "../src/game";
import SpellSprite from "../src/sprite";

const ship = new SpellSprite('teste.png', { width: 325, height: 173 })

const HELLO_WORLD = ({ isFirstFrame, canvas, game, colision, keyboard }) => {
    canvas.drawImage(ship)
}

const JumpGame = new SpellGame('hello-world', 30)

JumpGame.setKeyboard(['left', 'right', 'up'])
JumpGame.setGameLoop(HELLO_WORLD).start()