import SpellCanvasRenderEngine from "./canvas"
import SpellOpenGlEngine from "./opengl"
import Spell from "./spell"

/**
 * Rendering class 
 * 
 * - Controls render stack 
 * - Controls layers
 * - Interface with the render engines (webgl and regular canvas)
 * - allow user to render stuff
 * 
 */
export default class SpellRendering {    
    renderStack = []
    layers = [[]]
    enableLayers = false
    currentLayer = 0
    engine = 'canvas'

    constructor(canvasId) {
        this.switchEngine(canvasId)
        Spell.window.setCanvasFullWindow()
    }

    /**
     * Selects the render engine
     */
    switchEngine(canvasId){
        switch (this.engine) {
            case 'canvas':
                // CPU based rendering
                this.engine = new SpellCanvasRenderEngine(canvasId)
                break;
            case 'opengl':
                // GPU accelerated rendering
                this.engine = new SpellOpenGlEngine(canvasId)
                break;
        }
    }


    /**
     * setters
     */

    createLayer = () => this.layers.push([])
    setLayer = (layer) => this.currentLayer = layer


    /**
     * Tools / helpers
     * @todo remove this methods 
     */
    
    getRandomNumber = (max, min) => Spell.math.getRandomNumber(max, min)
    setCanvasFullWindow = (...args) => Spell.window.setCanvasFullWindow(...args)
    isMobile = (...args) => Spell.window.isMobile(...args)
    horizontal = (...args) => Spell.window.horizontal(...args)
    vertical = (...args) => Spell.window.vertical(...args)
    getWindowDimensions = (...args) => Spell.window.getDimensions(...args)


    /**
     * Render Stacking 
     */

    drawImage = (sprite) => this.addToRenderStack('image', sprite)
    drawText = (args) => this.addToRenderStack('text', args)
    drawPixel = (...args) => this.addToRenderStack('pixel', args)
    drawImages = (images)  => images.forEach((sprite) => this.addToRenderStack('image', sprite))


    /**
     * Rendering Engine 
     */

    setBackgroundColor = (...args) => this.engine.setBackgroundColor(...args)
    drawLine = (...args) => this.engine.drawLine(...args)
    clear = () => this.engine.clear()
    show = () => this.engine.show()
    
    
    /**
     * Adds an render element to the render stack 
     */
     addToRenderStack(type, element){
        if(this.enableLayers){
            this.layers[this.currentLayer].push({ type, element})
        }else {
            this.renderStackElement({ type, element})
        }
    }

    /**
     * Render a stacked element    
     */
    renderStackElement = (element) => {
        switch (element.type) {
            case 'pixel':
                this.engine.renderPixel(element.element)
                break;
            case 'text':
                this.engine.renderText(element.element)
                break;
            case 'image':
                this.engine.drawImageOnCanvas(element.element)
                break;
        }
    }

    /**
     * Render the entire stack using the selected engine method
     */
    render(){
        if(this.enableLayers){
            this.layers.forEach((layer) => {
                layer.forEach(this.renderStackElement)
            })
        }else{
            this.renderStack.forEach(this.renderStackElement)
        }
        this.renderStack = []
        this.layers = this.layers.map(() => [])
    }
}
