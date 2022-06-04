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

    constructor(imageFile){
        if(typeof imageFile === 'string'){
            this.setImageFile(imageFile)
        }
    }

    setImageFile = (src) => new Promise((resolve)=> {
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
        this.position.x = x
        this.position.y = y
    }

    setX = (x) => this.position.x = x
    setY = (y) => this.position.y = y
    incrementX = (x) => this.position.x += x
    incrementY = (y) => this.position.y += y
    change = (sprite) => this.bitmap = sprite

    /** Create a copy of this sprite */
    clone(){
        let spriteClone = new SpellSprite();

        if (this.isImage){
            spriteClone.setImageFile(this.element.src)
        }else{
            spriteClone.setBitmap({
                bitmap: this.bitmap,
                colors: this.colors,
                pixelSize: this.pixelSize            
            })
        }
        
        spriteClone.setPosition(this.position)
        return spriteClone
    }
}