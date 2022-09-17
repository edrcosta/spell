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
        if(typeof imageFile === 'string'){
            this.setImageFile(imageFile)
        }

        if(size && size.width && size.height){
            this.width = size.width ? size.width : 0
            this.height = size.height ? size.height : 0
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
        this.position.x = x
        this.position.y = y
    }

    setX = (x) => this.position.x = x
    setY = (y) => this.position.y = y
    incrementX = (x) => this.position.x += x
    incrementY = (y) => this.position.y += y
    change = (sprite) => this.bitmap = sprite
    setAngle = (angle) => this.angle = angle

    clone(){
        let spriteClone = new SpellSprite(this.element.src, { width: this.width, height: this.height });

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