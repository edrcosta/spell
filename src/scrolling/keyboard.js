import Spell from '../';

export default class PlayerInput {
    keys = {
        up: 87,
        down: 83,
        left: 65,
        right: 68,
        one: 49,
        two: 50,
        three: 51,
        four: 52,
        five: 53,
        e: 69
    };

    keyNames = {
        [this.keys.up]: 'up',
        [this.keys.down]: 'down',
        [this.keys.left]: 'left',
        [this.keys.right]: 'right',
        [this.keys.one]: 'one',
        [this.keys.two]: 'two',
        [this.keys.three]: 'three',
        [this.keys.four]: 'four',
        [this.keys.five]: 'five',
        [this.keys.e]: 'e'
    };

    constructor () {
        document.addEventListener('keydown', (event) => {
            this.onKeyEvent(event, true, false);
        });
        document.addEventListener('keyup', (event) => {
            this.onKeyEvent(event, false, true);
        });
    }

    onKeyEvent = (event, set) => {
        Spell.scrolling.GameState.runtime.keys[this.keyNames[event.keyCode]] = set;
    };

    move = (direction, speed, x, y) => {
        if (Spell.scrolling.GameState.get('playerDirection') === direction) {
            Spell.scrolling.GameState.runtime.movementIncrement = { x, y };
        }
        Spell.scrolling.GameState.runtime.playerSpeed = speed;
        Spell.scrolling.GameState.set('playerDirection', direction, 'runtime');
    };

    applyKeyboard () {
        const speed = Spell.scrolling.GameState.get('charSpeed', 'persistent');
        // diagonal is a little bit faster so this will fix
        const disagonalSpeed = speed - 1.2;

        // apply movement transformations for each position
        if (Spell.scrolling.GameState.runtime.keys.left && Spell.scrolling.GameState.runtime.keys.down) {
            this.move('leftDown', 'walking', -(disagonalSpeed), disagonalSpeed);
        } else if (Spell.scrolling.GameState.runtime.keys.left && Spell.scrolling.GameState.runtime.keys.up) {
            this.move('leftUp', 'walking', -(disagonalSpeed), -(disagonalSpeed));
        } else if (Spell.scrolling.GameState.runtime.keys.right && Spell.scrolling.GameState.runtime.keys.down) {
            this.move('rightUp', 'walking', +(disagonalSpeed), disagonalSpeed);
        } else if (Spell.scrolling.GameState.runtime.keys.right && Spell.scrolling.GameState.runtime.keys.up) {
            this.move('rightDown', 'walking', +(disagonalSpeed), -(disagonalSpeed));
        } else if (Spell.scrolling.GameState.runtime.keys.left) {
            this.move('left', 'walking', -(speed), 0);
        } else if (Spell.scrolling.GameState.runtime.keys.right) {
            this.move('right', 'walking', +(speed), 0);
        } else if (Spell.scrolling.GameState.runtime.keys.up) {
            this.move('up', 'walking', 0, -(speed));
        } else if (Spell.scrolling.GameState.runtime.keys.down) {
            this.move('down', 'walking', 0, +(speed));
        }
    }
}
