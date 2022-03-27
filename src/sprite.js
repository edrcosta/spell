/**
 * This class handdle everything related to sprites 
 * 
 * - Position
 * - rendering (image, pixels, callbacks)
 * - colision 
 * - display and hide
 */
export default class SpellSprite {
    // Bitmap sprites
    bitmap;
    colors;
    position = { x: 0, y: 0 }
    data = {}
    // Image sprites
    src
    element
    isImage = false

    // Canvas context sprites
    beforeRenderCallback = false
    afterRenderCallback = false

    constructor(imageFile){
        if(typeof imageFile === 'string'){
            this.setImageFile(imageFile)
        }
    }

    /**
     * Set a image file and load then
     * @returns Promise
     */
    setImageFile = (src) => new Promise((resolve)=> {
        this.isImage = true
        this.element = new Image()
        this.element.src = src
        this.element.addEventListener('load', resolve, false)
    })

    /**
     * set a bitmap image sprite
     * 
     * @param {*} param0 
     */
    setBitmap({ bitmap, colors, pixelSize, customData }){
        this.bitmap = bitmap;
        this.colors = colors;
        this.pixelSize = pixelSize ? pixelSize : 10
        this.data = customData
    }

    /**
     * Attach a behavior into sprite 
     * @param {*} callback 
     */
    beforeRender(callback){
        if(typeof callback !== 'function'){
            throw new Error('SPELL: Your callback must be a function')
        }
        this.beforeRenderCallback = callback
    }

    /**
     * Attach a behavior into sprite 
     * @param {*} callback 
     */
    afterRender(callback){
        if(typeof callback !== 'function'){
            throw new Error('SPELL: Your callback must be a function')
        }
        this.afterRenderCallback = callback
    }

    /**
     * set the x and y position 
     * @param { x: number, y: number } 
     */
    setPosition({x, y}){
        this.position.x = x
        this.position.y = y
    }

    /**
     * Position setters
     */
    setX = (x) => this.position.x = x

    setY = (y) => this.position.y = y

    /**
     * Position incremental setters "+="
     */
    incrementX = (x) => this.position.x += x
    incrementY = (y) => this.position.y += y

    /**
     * Edit the sprite array
     * 
     * @param {Array[]} sprite 
     * @returns 
     */
    change = (sprite) => this.bitmap = sprite

    /**
     * returns a clone of this class
     * @returns
     */
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