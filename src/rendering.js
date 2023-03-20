import SpellMath from "./math"
import SpellCanvasRenderEngine from "./canvas"
import SpellWindow from "./window"
import SpellOpenGlEngine from "./opengl"

export default class SpellRendering {    
    renderStack = []
    layers = [[]]
    enableLayers = false
    currentLayer = 0
    engine = 'canvas'

    constructor(canvasId) {        
        if(this.engine === 'canvas'){
            // CPU based rendering
            this.engine = new SpellCanvasRenderEngine(canvasId)
        }else {
            // GPU accelerated rendering
            this.engine = new SpellOpenGlEngine(canvasId)
        }

        this.window = new SpellWindow(canvasId)
        this.window.setCanvasFullWindow()
    }

    // setters

    createLayer = () => this.layers.push([])
    setLayer = (layer) => this.currentLayer = layer


    // Tools / helpers

    getRandomNumber = (max, min) => SpellMath.getRandomNumber(max, min)
    setCanvasFullWindow = (...args) => this.window.setCanvasFullWindow(...args)
    isMobile = (...args) => this.window.isMobile(...args)
    horizontal = (...args) => this.window.horizontal(...args)
    vertical = (...args) => this.window.vertical(...args)
    getWindowDimensions = (...args) => this.window.getDimensions(...args)


    // Render Stacking 

    drawImage = (sprite) => this.addToRenderStack('image', sprite)
    drawText = (args) => this.addToRenderStack('text', args)
    drawPixel = (...args) => this.addToRenderStack('pixel', args)
    drawImages = (images)  => images.forEach((sprite) => this.addToRenderStack('image', sprite))


    // Rendering Engine 

    setBackgroundColor = (...args) => this.engine.setBackgroundColor(...args)
    drawLine = (...args) => this.engine.drawLine(...args)
    clear = () => this.engine.clear()
    show = () => this.engine.show()
    

    // Stack Rendering
 
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
