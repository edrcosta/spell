import SpellCanvasRenderEngine from './canvas';
import SpellOpenGlEngine from './opengl';
import Spell from './spell';

export default class SpellRendering {
    renderStack = [];
    layers = [[]];
    currentLayer = 0;
    selectedEngine = 'canvas';
    engine = null;

    constructor (canvasId) {
        this.switchEngine(canvasId);
        Spell.window.setCanvasFullWindow();
    }

    switchEngine (canvasId) {
        switch (this.selectedEngine) {
        case 'canvas':
            this.engine = new SpellCanvasRenderEngine(canvasId);
            break;
        case 'opengl':
            this.engine = new SpellOpenGlEngine(canvasId);
            break;
        }
    }

    setLayer = (layer) => { this.currentLayer = layer; };

    drawBlock = (block) => this.addToRenderStack('block', block);

    drawImage = (sprite) => this.addToRenderStack('image', sprite);

    drawText = (args) => this.addToRenderStack('text', args);

    drawPixel = (args) => this.addToRenderStack('pixel', args);

    drawImages = (images) => images.forEach((sprite) => this.addToRenderStack('image', sprite));

    setBackgroundColor = (...args) => this.engine.setBackgroundColor(...args);

    drawLine = (...args) => this.engine.drawLine(...args);

    clear = () => this.engine.clear();

    show = () => this.engine.show();

    printscreen = () => this.engine.element.toDataURL('png');

    addToRenderStack (type, params) {
        if (!this.layers[this.currentLayer]) {
            this.layers[this.currentLayer] = [];
        }
        this.layers[this.currentLayer].push({ type, params });
    }

    renderStackElement = (element) => {
        switch (element.type) {
        case 'pixel':
            this.engine.renderPixel(element.params);
            break;
        case 'text':
            this.engine.renderText(element.params);
            break;
        case 'image':
            this.engine.drawImageOnCanvas(element.params);
            break;
        case 'block':
            this.engine.drawBlock(element.params);
            break;
        }
    };

    render () {
        this.layers.forEach((layer) => {
            layer.forEach(this.renderStackElement);
        });
        this.renderStack = [];
        this.layers = this.layers.map(() => []);
    }
}
