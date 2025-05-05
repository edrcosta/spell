import Spell from '../';
import PlayerInput from './keyboard';

/**
 * Side scroller player class
 *
 * 8 direction player movement/rendering
 */
export default class Player {
    count = 0;
    toStop = 0;
    stopedSprites = null;

    constructor () {
        this.input = new PlayerInput();
    }

    render () {
        Spell.canvas.setLayer(1);

        if (!Spell.scrolling.GameState.disabled.includes('keyboard')) {
            this.input.applyKeyboard();
        }

        if (!Spell.scrolling.GameState.disabled.includes('player')) {
            this.renderPlayer();
        }

        Spell.canvas.setLayer(0);
    }

    renderPlayer () {
        if (Spell.scrolling.GameState.get('playerDirection') !== 'stoped') {
            this.stopAfterMove();
        }

        const current = this.getCurrent();
        current.position = this.getCenter(current);

        Spell.scrolling.GameState.runtime.playerScreenPosition = current.position;
        Spell.scrolling.GameState.runtime.currentPlayerSprite = current;

        this.debugPosition();
        Spell.canvas.drawImage(current);
    }

    debugPosition () {
        if (Spell.scrolling.GameState.disabled.includes('debug.playerposition')) return false;

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

    stopAfterMove () {
        this.toStop++;
        if (this.toStop > 20) {
            Spell.scrolling.GameState.runtime.playerSpeed = 'stoped';
            this.count = 0;
            this.toStop = 0;
        }
    }

    getCurrent () {
        if (Spell.scrolling.GameState.runtime.playerSpeed === 'stoped') { return this.stopedSprites[Spell.scrolling.GameState.get('playerDirection')]; }
        return Spell.animation.getCurrentFrame(`${Spell.scrolling.GameState.runtime.playerSpeed}_${Spell.scrolling.GameState.get('playerDirection')}`);
    }

    addAnimations ({
        walking,
        stopped
    }) {
        this.stopedSprites = stopped;

        for (const id of Object.keys(walking)) {
            Spell.animation.create(id, {
                frames: walking[id],
                interval: 3
            });
        }
    }
}
