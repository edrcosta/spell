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
    previousPos = { x: 0, y: 0}

    setImageFile = (src, size) => new Promise((resolve)=> {
        if(typeof size !== 'undefined'){
            this.setSize(size)
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

    setPosition({x, y}, exactPosition){
        this.previousPos = this.position

        if(exactPosition){
            this.position.x = x
            this.position.y = y
        }else{
            this.position.x = x === 'center' ?  this.getCenteredX() : this.position.x = x - (this.width / 2)
            this.position.y = y === 'center' ? this.getCenteredY() : y - (this.height / 2) 
        }
    }

    getCenteredX = () => Spell.canvas.horizontal(50) - (this.width / 2)

    getCenteredY = () => Spell.canvas.vertical(50) - (this.height / 2)

    setX = (x) => this.position.x = x

    setY = (y) => this.position.y = y

    incrementX = (x) => this.position.x += x

    incrementY = (y) => this.position.y += y

    setAngle = (angle) => this.angle = angle

    setSize = ({width, height}) => {
        this.width = width
        this.height = height
    }

    clone = () => {
        const clone = new SpellSprite()
        clone.setImageFile(this.element.src, { width: this.width, height: this.height})
        clone.setPosition(this.position)
        return clone
    }
}