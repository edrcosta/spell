import Spell from '.';

export default class SpellOpenGlEngine {
    element;
    context;

    constructor (canvasId) {
        const element = document.getElementById(canvasId);

        if (!element) {
            throw new Error('SPELL: You must set a valid canvas ID');
        }
        this.element = element;
        this.context = element.getContext('webgl', {
            colorSpace: 'display-p3'
        });

        if (this.context === null) {
            throw new Error('SPELL: WebGL its not suported please change to canvas rendering');
        }

        this.clear();
    }

    clear = () => {
        this.context.clearColor(0.0, 0.0, 0.0, 1.0);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
    };

    show = () => { this.element.style.display = 'block'; };

    setBackgroundColor = (color, transparency = 1) => {
        const { r, g, b } = Spell.math.colorToRGB(color);
        const div = 255;
        this.context.clearColor(r / div, g / div, b / div, transparency);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
    };

    drawText ({ text, color, size, position, font }) {}

    drawLine ({ from, to, color, width }) {}

    drawImage = (sprite) => {};

    renderPixel ({ x, y, color, pixelW, pixelH }) {}

    drawCircle ({ x, y, color, radius, width, fill = false }) {}

    increaseZoom () {}

    decreaseZoom () {}

    resetZoom () {}
}
