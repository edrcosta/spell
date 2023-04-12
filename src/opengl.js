import Spell from "./spell";

/**
 * OpenGL based rendering
 */
export default class SpellOpenGlEngine {
    element
    context

    constructor(canvasId) {
        let element = document.getElementById(canvasId)
        if(!element){
            throw new Error('SPELL: You must set a valid canvas ID');
        }
        this.element = element
        this.context = element.getContext('webgl')

        if(this.context === null){
            throw new Error('SPELL: WebGL its not suported please change to canvas rendering')
        }
    }    

    clear = () => {
        this.context.clearColor(0.0, 0.0, 0.0, 1.0);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
    }

    show = () => this.element.style.display = 'block'
    
    setBackgroundColor = (color) => {
        // @todo fix alpha multiplier
        const rgb = Spell.math.colorToRGB(color)
        this.context.clearColor(rgb.r, rgb.g, rgb.b, 1.0);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
    }
    
    renderText({ text, color, size, position , font  }){
        // @todo
    }
    
    drawLine({ from, to, color, width }){
        // @todo
    }
    
    drawImageOnCanvas = (sprite) => {
        // @todo
    }

    renderPixel({x, y, color, pixelW, pixelH}){
        // @todo
    }
}