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
        Spell.scrolling.GameState.get('keys')[this.keyNames[event.keyCode]] = set;
    };

    move = (direction, speed, x, y) => {
        if (Spell.scrolling.GameState.get('playerDirection') === direction) {
            Spell.scrolling.GameState.update({
                movementIncrement: { x, y }
            }, 'runtime');
        }
        Spell.scrolling.GameState.set('playerSpeed', speed, 'runtime');
        Spell.scrolling.GameState.set('playerDirection', direction, 'runtime');
    };

    applyKeyboard () {
        const speed = Spell.scrolling.GameState.get('charSpeed', 'persistent');

        // diagonal is a little bit faster so this will fix
        const disagonalSpeed = speed - 1.2;

        const { left, down, up, right } = Spell.scrolling.GameState.runtime.keys;

        const type = 'walking';

        if (left && down) {
            this.move('leftDown', type, -(disagonalSpeed), disagonalSpeed);
        } else if (left && up) {
            this.move('leftUp', type, -(disagonalSpeed), -(disagonalSpeed));
        } else if (right && down) {
            this.move('rightUp', type, +(disagonalSpeed), disagonalSpeed);
        } else if (right && up) {
            this.move('rightDown', type, +(disagonalSpeed), -(disagonalSpeed));
        } else if (left) {
            this.move('left', type, -(speed), 0);
        } else if (right) {
            this.move('right', type, +(speed), 0);
        } else if (up) {
            this.move('up', type, 0, -(speed));
        } else if (down) {
            this.move('down', type, 0, +(speed));
        }
    }
}
