import SpellCanvasRenderEngine from './canvas';
import SpellOpenGlEngine from './opengl';
import Spell from './index';
import SpellRenderStack from './render-stack';

export default class SpellRendering {
    selectedEngine = 'canvas';
    engine = null;

    constructor ({ gameCanvasId, engine = 'canvas' }) {
        if (typeof gameCanvasId !== 'string') {
            throw new Error('Spell: canvas id must be a string');
        }

        if (engine !== 'canvas' && engine !== 'opengl') {
            throw new Error('Spell: engine must be canvas or opengl');
        }

        this.switchEngine(gameCanvasId);
        this.selectedEngine = engine;
        Spell.window.setCanvasFullWindow();
    }

    render () {
        SpellRenderStack.getAndExecute(this.renderElement);
    }

    renderElement = ({ method, params }) => this.engine[method](params);

    switchEngine (gameCanvasId) {
        this.engine = this.selectedEngine === 'canvas'
            ? new SpellCanvasRenderEngine(gameCanvasId)
            : new SpellOpenGlEngine(gameCanvasId);
    }

    setBackgroundColor = (...args) => this.engine.setBackgroundColor(...args);
    printscreen = () => this.engine.element.toDataURL('png');
    clear = () => this.engine.clear();
    show = () => this.engine.show();
    increaseZoom = () => this.engine.increaseZoom();
    decreaseZoom = () => this.engine.decreaseZoom();
    resetZoom = () => this.engine.resetZoom && this.engine.resetZoom();
    getZoomScale = () => this.engine.getZoomScale ? this.engine.getZoomScale() : 1.0;

    setLayer = SpellRenderStack.setLayer;
    drawBlock = SpellRenderStack.push('drawBlock');
    drawImage = SpellRenderStack.push('drawImage');
    drawText = SpellRenderStack.push('drawText');
    drawPixel = SpellRenderStack.push('drawPixel');
    drawLine = SpellRenderStack.push('drawLine');
    drawImages = SpellRenderStack.pushArr('drawImage');
    drawCircle = SpellRenderStack.push('drawCircle');
}
