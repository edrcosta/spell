import Spell from '../../';
import RotationalKeyboard from '../keyboards/rotational-keyboard';

export default class SpaceShipPlayer {
    sprite = null;
    input = null;

    constructor () {
        this.input = new RotationalKeyboard();
    }

    render () {
        Spell.canvas.setLayer(1);

        if (!Spell.scrolling.GameState.disabled.includes('keyboard')) {
            this.input.applyKeyboard();
            this.applyConstantMovement();
        }

        if (!Spell.scrolling.GameState.disabled.includes('player')) {
            this.renderPlayer();
        }

        Spell.canvas.setLayer(0);
    }

    renderPlayer () {
        const current = this.sprite;
        current.position = this.getCenter(current);
        current.angle = Spell.scrolling.GameState.get('rotation');

        Spell.scrolling.GameState.runtime.playerScreenPosition = current.position;
        Spell.scrolling.GameState.runtime.currentPlayerSprite = current;

        Spell.canvas.setLayer(1);
        this.debugPosition();
        Spell.canvas.setLayer(0);
        Spell.canvas.drawImage(current);
    }

    debugPosition () {
        if (Spell.scrolling.GameState.disabled.includes('debug.playerposition')) {
            return false;
        }

        const x = parseFloat(Spell.scrolling.GameState.persistent.position.x).toFixed(4);
        const y = parseFloat(Spell.scrolling.GameState.persistent.position.y).toFixed(4);

        Spell.canvas.drawText({
            text: `X:${x}, Y:${y}`,
            color: 'red',
            size: 20,
            position: {
                x: Spell.window.horizontal(10),
                y: Spell.window.vertical(90)
            }
        });
    }

    getCenter = (currentPlayerSprite) => ({
        x: Spell.window.horizontal(50) - (currentPlayerSprite.width / 2),
        y: Spell.window.vertical(50) - (currentPlayerSprite.height / 2)
    });

    applyConstantMovement () {
        const currentRotation = Spell.scrolling.GameState.get('rotation');
        const baseSpeed = Spell.scrolling.GameState.get('charSpeed', 'persistent');

        const speed = baseSpeed;
        const adjustedAngle = currentRotation - 90;
        const radians = adjustedAngle * (Math.PI / 180);

        Spell.scrolling.GameState.update({
            movementIncrement: {
                x: Math.cos(radians) * speed,
                y: Math.sin(radians) * speed
            }
        });
    }

    addAnimations (sprite) {
        this.sprite = sprite;
    }
}
