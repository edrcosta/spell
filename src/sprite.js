import Spell from '.';

export default class SpellSprite {
    position = { x: 0, y: 0 };
    previousPos = { x: 0, y: 0 };
    src;
    element;
    width = 0;
    height = 0;
    angle = 0;

    setImageFile = (src, size) => new Promise((resolve) => {
        if (typeof size !== 'undefined') {
            this.setSize(size);
        }

        this.element = new Image();
        this.element.src = src;
        this.src = src;
        this.element.addEventListener('load', resolve, false);
    });

    setPosition ({ x, y }, exactPosition) {
        this.previousPos = this.position;

        if (exactPosition) {
            this.position.x = x;
            this.position.y = y;
        } else {
            this.position.x = x === 'center' ? this.getCenteredX() : this.position.x = x - (this.width / 2);
            this.position.y = y === 'center' ? this.getCenteredY() : y - (this.height / 2);
        }
    }

    getCenteredX = () => Spell.window.horizontal(50) - (this.width / 2);
    getCenteredY = () => Spell.window.vertical(50) - (this.height / 2);

    setX = (x) => { this.position.x = x; };
    setY = (y) => { this.position.y = y; };
    incrementX = (x) => { this.position.x += x; };
    incrementY = (y) => { this.position.y += y; };
    setAngle = (angle) => { this.angle = angle; };

    setSize = ({ width, height }) => {
        this.width = width;
        this.height = height;
    };

    clone = () => {
        // js sucks at copying objects... wtf it passes things as references some times (make sense the interpreter has to descontruct stuff)
        const clone = new SpellSprite();
        clone.setImageFile(this.element.src, { width: this.width, height: this.height });
        clone.setPosition(this.position);
        return clone;
    };
}
