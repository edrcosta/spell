import Spell from './spell';

/**
 * OpenGL based rendering
 */
export default class SpellOpenGlEngine {
    element;
    context;

    constructor (canvasId) {
        const element = document.getElementById(canvasId);
        if (!element) {
            throw new Error('SPELL: You must set a valid canvas ID');
        }
        this.element = element;
        this.context = element.getContext('webgl');

        if (this.context === null) {
            throw new Error('SPELL: WebGL its not suported please change to canvas rendering');
        }
    }

    clear = () => {
        this.context.clearColor(0.0, 0.0, 0.0, 1.0);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
    };

    show = () => { this.element.style.display = 'block'; };

    setBackgroundColor = (color) => {
        // @todo fix alpha multiplier
        const rgb = Spell.math.colorToRGB(color);
        this.context.clearColor(rgb.r, rgb.g, rgb.b, 1.0);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
    };

    renderText ({ text, color, size, position, font }) {
        const { x, y } = position;
        const { r, g, b } = color;

        this.context.font = `${size}px ${font}`;
        this.context.fillStyle = `rgb(${r}, ${g}, ${b})`;
        this.context.fillText(text, x, y);
    }

    drawLine ({ from, to, color, width }) {
        const { x: x1, y: y1 } = from;
        const { x: x2, y: y2 } = to;
        const { r, g, b } = color;

        const vertices = [
            x1, y1,
            x2, y2
        ];

        const colors = [
            r, g, b,
            r, g, b
        ];

        const vertexBuffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, vertexBuffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vertices), this.context.STATIC_DRAW);

        const colorBuffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, colorBuffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(colors), this.context.STATIC_DRAW);

        const positionAttributeLocation = this.context.getAttribLocation(this.context.program, 'a_position');
        this.context.bindBuffer(this.context.ARRAY_BUFFER, vertexBuffer);
        this.context.vertexAttribPointer(positionAttributeLocation, 2, this.context.FLOAT, false, 0, 0);
        this.context.enableVertexAttribArray(positionAttributeLocation);

        const colorAttributeLocation = this.context.getAttribLocation(this.context.program, 'a_color');
        this.context.bindBuffer(this.context.ARRAY_BUFFER, colorBuffer);
        this.context.vertexAttribPointer(colorAttributeLocation, 3, this.context.FLOAT, false, 0, 0);
        this.context.enableVertexAttribArray(colorAttributeLocation);

        this.context.lineWidth(width);
        this.context.drawArrays(this.context.LINES, 0, 2);
    }

    drawImageOnCanvas = (sprite) => {
        const { image, position, size } = sprite;
        const { x, y } = position;
        const { width, height } = size;

        const vertices = [
            x, y,
            x + width, y,
            x, y + height,
            x + width, y + height
        ];

        const textureCoordinates = [
            0, 0,
            1, 0,
            0, 1,
            1, 1
        ];

        const vertexBuffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, vertexBuffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vertices), this.context.STATIC_DRAW);

        const textureCoordBuffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, textureCoordBuffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(textureCoordinates), this.context.STATIC_DRAW);

        const positionAttributeLocation = this.context.getAttribLocation(this.context.program, 'a_position');
        this.context.bindBuffer(this.context.ARRAY_BUFFER, vertexBuffer);
        this.context.vertexAttribPointer(positionAttributeLocation, 2, this.context.FLOAT, false, 0, 0);
        this.context.enableVertexAttribArray(positionAttributeLocation);

        const textureCoordAttributeLocation = this.context.getAttribLocation(this.context.program, 'a_textureCoord');
        this.context.bindBuffer(this.context.ARRAY_BUFFER, textureCoordBuffer);
        this.context.vertexAttribPointer(textureCoordAttributeLocation, 2, this.context.FLOAT, false, 0, 0);
        this.context.enableVertexAttribArray(textureCoordAttributeLocation);

        const texture = this.context.createTexture();
        this.context.bindTexture(this.context.TEXTURE_2D, texture);
        this.context.texImage2D(this.context.TEXTURE_2D, 0, this.context.RGBA, this.context.RGBA, this.context.UNSIGNED_BYTE, image);
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_S, this.context.CLAMP_TO_EDGE);
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_T, this.context.CLAMP_TO_EDGE);
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MIN_FILTER, this.context.LINEAR);
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MAG_FILTER, this.context.LINEAR);

        this.context.drawArrays(this.context.TRIANGLE_STRIP, 0, 4);
    };

    renderPixel ({ x, y, color, pixelW, pixelH }) {
        const vertices = [
            x, y,
            x + pixelW, y,
            x, y + pixelH,
            x + pixelW, y + pixelH
        ];

        const colorBuffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, colorBuffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(color), this.context.STATIC_DRAW);

        const vertexBuffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, vertexBuffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vertices), this.context.STATIC_DRAW);

        const positionAttributeLocation = this.context.getAttribLocation(this.context.program, 'a_position');
        this.context.bindBuffer(this.context.ARRAY_BUFFER, vertexBuffer);
        this.context.vertexAttribPointer(positionAttributeLocation, 2, this.context.FLOAT, false, 0, 0);
        this.context.enableVertexAttribArray(positionAttributeLocation);

        const colorAttributeLocation = this.context.getAttribLocation(this.context.program, 'a_color');
        this.context.bindBuffer(this.context.ARRAY_BUFFER, colorBuffer);
        this.context.vertexAttribPointer(colorAttributeLocation, 4, this.context.FLOAT, false, 0, 0);
        this.context.enableVertexAttribArray(colorAttributeLocation);

        this.context.drawArrays(this.context.TRIANGLE_STRIP, 0, 4);
    }
}
