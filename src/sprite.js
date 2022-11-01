import Spell from "./spell";

export default class SpellSprite {
    bitmap;
    colors;
    position = { x: 0, y: 0 }
    data = {}
    src
    element
    isImage = false
    beforeRenderCallback = false
    afterRenderCallback = false
    width = 0
    height = 0
    angle = 0

    constructor(imageFile, size){
        this.position = { x: 0, y: 0 }
        this.setImageFile(imageFile)
        if(size && size.width && size.height){
            this.setSize(size)
        }
    }

    setImageFile = (src, size) => new Promise((resolve)=> {
        if(typeof size !== 'undefined'){
            this.width = size.width
            this.height = size.height
        }
        this.isImage = true
        this.element = new Image()
        this.element.src = src
        this.element.addEventListener('load', resolve, false)
    })

    setBitmap({ bitmap, colors, pixelSize, customData }){
        this.bitmap = bitmap;
        this.colors = colors;
        this.pixelSize = pixelSize ? pixelSize : 10
        this.data = customData
    }

    beforeRender(callback){
        if(typeof callback !== 'function'){
            throw new Error('SPELL: Your callback must be a function')
        }
        this.beforeRenderCallback = callback
    }

    afterRender(callback){
        if(typeof callback !== 'function'){
            throw new Error('SPELL: Your callback must be a function')
        }
        this.afterRenderCallback = callback
    }

    setPosition({x, y}){
        this.position.x = x === 'center' ?  this.getCenteredX() : this.position.x = x - (this.width / 2)
        this.position.y = y === 'center' ? this.getCenteredY() : y - (this.height / 2) 
    }

    getCenteredX = () => Spell.canvas.horizontal(50) - (this.width / 2)

    getCenteredY = () => Spell.canvas.vertical(50) - (this.height / 2)

    setX = (x) => this.position.x = x

    setY = (y) => this.position.y = y

    incrementX = (x) => this.position.x += x

    incrementY = (y) => this.position.y += y

    setAngle = (angle) => this.angle = angle

    setSize = ({width, height}) => {
        this.width = width * Spell.canvas.zoomLevel
        this.height = height * Spell.canvas.zoomLevel
    }

    clone = () => {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }
}