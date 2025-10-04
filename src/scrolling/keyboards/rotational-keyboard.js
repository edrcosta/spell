import Spell from '../..';

export default class RotationalKeyboard {
    keys = {
        left: 65,
        right: 68,
        up: 87
    };

    keyNames = {
        [this.keys.left]: 'left',
        [this.keys.right]: 'right',
        [this.keys.up]: 'up',
        [this.keys.space]: 'space'
    };

    constructor () {
        document.addEventListener('keydown', (event) => {
            this.onKeyEvent(event, true);
        });
        document.addEventListener('keyup', (event) => {
            this.onKeyEvent(event, false);
        });
    }

    onKeyEvent = (event, set) => {
        if (this.keyNames[event.keyCode]) {
            Spell.scrolling.GameState.runtime.keys[this.keyNames[event.keyCode]] = set;
        }
    };

    applyKeyboard () {
        const { left, right } = Spell.scrolling.GameState.runtime.keys;
        const currentRotation = Spell.scrolling.GameState.get('rotation');

        if (left) {
            Spell.scrolling.GameState.set('rotation', currentRotation - 5);
        }
        if (right) {
            Spell.scrolling.GameState.set('rotation', currentRotation + 5);
        }
    }
}
