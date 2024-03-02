import SpellCanvasRenderEngine from './canvas';
import SpellOpenGlEngine from './opengl';
import Spell from './index';
import SpellRenderStack from './render-stack';

export default class SpellRendering {
    selectedEngine = 'canvas';
    engine = null;

    constructor (canvasId) {
        this.switchEngine(canvasId);
        Spell.window.setCanvasFullWindow();
    }

    render () {
        SpellRenderStack.getAndExecute(this.renderElement);
    }

    renderElement = ({ method, params }) => this.engine[method](params);

    switchEngine (canvasId) {
        this.engine = this.selectedEngine === 'canvas'
            ? new SpellCanvasRenderEngine(canvasId)
            : new SpellOpenGlEngine(canvasId);
    }

    setBackgroundColor = (...args) => this.engine.setBackgroundColor(...args);
    printscreen = () => this.engine.element.toDataURL('png');
    clear = () => this.engine.clear();
    show = () => this.engine.show();

    setLayer = SpellRenderStack.setLayer;
    drawBlock = SpellRenderStack.push('drawBlock');
    drawImage = SpellRenderStack.push('drawImage');
    drawText = SpellRenderStack.push('drawText');
    drawPixel = SpellRenderStack.push('drawPixel');
    drawLine = SpellRenderStack.push('drawLine');
    drawImages = SpellRenderStack.pushArr('drawImage');
}
