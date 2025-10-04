import Spell from '.';

export default class SpellCanvasRenderEngine {
    element;
    context;
    stampEnabled = false;
    scale = 1.0;
    scaleMultiplier = 0.8;

    constructor (canvasId) {
        const element = document.getElementById(canvasId);
        if (!element) {
            throw new Error('SPELL: You must set a valid canvas ID');
        }
        this.element = element;
        this.context = element.getContext('2d');
    }

    clear = () => {
        this.context.save();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.element.width, this.element.height);
        this.context.restore();
    };

    show = () => { this.element.style.display = 'block'; };

    setBackgroundColor = (color) => {
        this.context.save();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.element.width, this.element.height);
        this.context.restore();
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

    drawImage = ({ width, height, angle, element, position: { x, y }, ignoreZoom = false }) => {
        if (ignoreZoom && this.scale !== 1.0) {
            this.context.save();
            this.context.setTransform(1, 0, 0, 1, 0, 0);

            const centerX = this.element.width / 2;
            const centerY = this.element.height / 2;

            const adjustedX = (x - centerX) * this.scale + centerX;
            const adjustedY = (y - centerY) * this.scale + centerY;

            if (typeof angle !== 'undefined') {
                const xx = width / 2;
                const yy = height / 2;
                const rad = angle !== 0 ? Spell.math.getRadians(angle) : 0;

                this.context.translate(adjustedX + xx, adjustedY + yy);
                this.context.rotate(rad);
                this.context.drawImage(element, -xx, -yy, width, height);
            } else {
                this.context.drawImage(element, adjustedX, adjustedY, width, height);
            }

            this.context.restore();
            this.updateTransform();
        } else if (typeof angle !== 'undefined') {
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
        const pad = 0.5;
        this.context.fillRect(x - pad / 2, y, width + pad, height);
        this.context.fillRect(x, y - pad / 2, width, height + pad);
    }

    drawCircle ({ x, y, color, radius, width, fill = false }) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);

        if (fill) {
            this.context.fillStyle = color;
            this.context.fill();
        } else {
            this.context.strokeStyle = color;
            this.context.lineWidth = width;
            this.context.stroke();
        }
    }

    increaseZoom () {
        this.scale /= this.scaleMultiplier;
        this.updateTransform();
    }

    decreaseZoom () {
        this.scale *= this.scaleMultiplier;
        this.updateTransform();
    }

    resetZoom () {
        this.scale = 1.0;
        this.updateTransform();
    }

    getZoomScale () {
        return this.scale;
    }

    updateTransform () {
        this.context.setTransform(1, 0, 0, 1, 0, 0);

        const centerX = this.element.width / 2;
        const centerY = this.element.height / 2;

        this.context.translate(centerX, centerY);
        this.context.scale(this.scale, this.scale);
        this.context.translate(-centerX, -centerY);
    }
}
