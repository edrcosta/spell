import SpellCanvasRenderEngine from "./canvas"
import SpellOpenGlEngine from "./opengl"
import Spell from "./spell"

export default class SpellRendering {    
    renderStack = []
    layers = [[]]
    currentLayer = 0
    engine = 'canvas'

    constructor(canvasId) {
        this.switchEngine(canvasId)
        Spell.window.setCanvasFullWindow()
    }

    switchEngine(canvasId){
        switch (this.engine) {
            case 'canvas':
                this.engine = new SpellCanvasRenderEngine(canvasId)
                break;
            case 'opengl':
                this.engine = new SpellOpenGlEngine(canvasId)
                break;
        }
    }

    setLayer = (layer) => this.currentLayer = layer

    drawImage = (sprite) => this.addToRenderStack('image', sprite)
    
    drawText = (args) => this.addToRenderStack('text', args)
    
    drawPixel = (...args) => this.addToRenderStack('pixel', args)
    
    drawImages = (images)  => images.forEach((sprite) => this.addToRenderStack('image', sprite))

    setBackgroundColor = (...args) => this.engine.setBackgroundColor(...args)

    drawLine = (...args) => this.engine.drawLine(...args)

    clear = () => this.engine.clear()

    show = () => this.engine.show()
    
    addToRenderStack(type, element){
        if(!this.layers[this.currentLayer]){
            this.layers[this.currentLayer] = []
        }
        this.layers[this.currentLayer].push({ type, element})
    }

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

    render(){
        console.log(this.layers)
        this.layers.forEach((layer) => {
            layer.forEach(this.renderStackElement)
        })
        this.renderStack = []
        this.layers = this.layers.map(() => [])
    }
}
