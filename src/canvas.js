import Spell from '.';

export default class SpellCanvasRenderEngine {
    element;
    context;
    stampEnabled = false;
    zoomLevel = 1;

    constructor (canvasId) {
        const element = document.getElementById(canvasId);
        if (!element) {
            throw new Error('SPELL: You must set a valid canvas ID');
        }
        this.element = element;
        this.context = element.getContext('2d');
    }

    clear = () => this.context.clearRect(0, 0, this.element.width, this.element.height);

    show = () => { this.element.style.display = 'block'; };

    setBackgroundColor = (color) => {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.element.width, this.element.height);
    };

    drawText ({ position: { x, y }, text, color, size, position, font }) {
        this.context.textAlign = 'center';
        this.context.fillStyle = color;
        this.context.font = `${size}px ${font || 'Arial'}`;
        this.context.fillText(text, x, y);
    }

    drawLine ({ from, to, color, width }) {
        this.context.beginPath();
        this.context.moveTo(from.x, from.y);
        this.context.lineTo(to.x, to.y);
        this.context.strokeStyle = color || '#000';
        this.context.lineWidth = width || 1;
        this.context.stroke();
    }

    drawImage = ({ width, height, angle, element, position: { x, y } }) => {
        if (typeof angle !== 'undefined') {
            const xx = width / 2;
            const yy = height / 2;
            const rad = angle !== 0 ? Spell.math.getRadians(angle) : 0;

            this.context.save();
            this.context.translate(x + xx, y + yy);
            this.context.rotate(rad);
            this.context.drawImage(element, -xx, -yy, width, height);
            this.context.restore();
        } else {
            this.context.drawImage(element, x, y, width, height);
        }
    };

    drawBlock ({ position: { x, y }, width, height }) {
        this.context.beginPath();
        this.context.rect(x, y, width, height);
        this.context.stroke();
    }

    drawPixel ({ x, y, color, width, height }) {
        if (typeof height === 'undefined') { height = width; };
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
        this.context.fillRect(x, y, width, height);
    }
}
