import SpellCanvasRenderEngine from './canvas';
import SpellOpenGlEngine from './opengl';
import Spell from './index';

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
        this.engine = this.selectedEngine === 'canvas'
            ? new SpellCanvasRenderEngine(canvasId)
            : new SpellOpenGlEngine(canvasId);
    }

    setLayer = (layer) => { this.currentLayer = layer; };
    setBackgroundColor = (...args) => this.engine.setBackgroundColor(...args);
    clear = () => this.engine.clear();
    show = () => this.engine.show();
    printscreen = () => this.engine.element.toDataURL('png');

    _pushNewElementToRenderStack = (type) => (params) => this._pushToRenderStack(type, params);
    _pushNewElementToRenderStackArr = (type) => (elements) => elements.forEach((element) => this._pushToRenderStack(type, element));

    _pushToRenderStack (type, params) {
        if (!this.layers[this.currentLayer]) {
            this.layers[this.currentLayer] = [];
        }
        this.layers[this.currentLayer].push({ type, params });
    }

    drawBlock = this._pushNewElementToRenderStack('drawBlock');
    drawImage = this._pushNewElementToRenderStack('drawImage');
    drawText = this._pushNewElementToRenderStack('drawText');
    drawPixel = this._pushNewElementToRenderStack('drawPixel');
    drawLine = this._pushNewElementToRenderStack('drawLine');
    drawImages = this._pushNewElementToRenderStackArr('drawImage');

    render () {
        this.layers.forEach((layer) => {
            layer.forEach(
                (element) => this.engine[element.type](element.params)
            );
        });
        this.renderStack = [];
        this.layers = this.layers.map(() => []);
    }
}
