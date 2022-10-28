import SpellMath from "./math"
import SpellMathCache from "./memory-cache"

export default class SpellCanvas {
    element
    context
    visualChange = false
    font = false
    zoomLevel = 1

    constructor(canvasId, _debugger) {
        let element = document.getElementById(canvasId)
        if(!element){
            throw new Error('SPELL: You must set a valid canvas ID');
        }
        this.debugger = _debugger
        this.element = element
        this.context = element.getContext('2d')
        this.fixDpi()
    }

    getRandomInt = (max, min) => SpellMath.getRandomInt(max, min)

    clear = () => this.context.clearRect(0, 0, this.element.width, this.element.height)
    
    drawImage = (sprite) => this.__drawImageOnCanvas(sprite)

    drawImages = (images)  => images.forEach(this.__drawImageOnCanvas)

    setTextSize = (textSize) => this.textSize = textSize
    
    setTextColor = (color) => this.textColor = color

    show = () => this.element.style.display = 'block'

    setZoom = (zoomLevel) => this.zoomLevel = zoomLevel

    /**
     * set resize listenner to resize the canvas
     */
    setFullWindow(){
        this.fullySize()
        document.addEventListener('resize', this.fullySize())
    }

    /**
     * Set canvas to full window size
     */
    fullySize(){
        const size = this.getWindowDimensions()
        this.element.style.height = `${size.height}px`
        this.element.style.width = `${size.width}px`
        this.fixDpi()
    }

    isMobile = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    /**
     * Return the percentual of window width
     */
    horizontal = (percentual) =>{ 
        if(typeof percentual !== 'number'){
            throw new Error('SPELL: horizontal percentual must be a number')
        }

        if ( navigator.platform != "iPad" && navigator.platform != "iPhone" && navigator.platform != "iPod" )
		    return SpellMath.percentualOf(percentual, window.innerWidth) * window.devicePixelRatio
        return SpellMath.percentualOf(percentual, document.body.getBoundingClientRect().width)
    }
  
    /**
     * return the percentual of the window height
     * @param {Number} percentual 
     * @returns 
     */
    vertical = (percentual) => {
        if(typeof percentual !== 'number'){
            throw new Error('SPELL: vertical percentual must be a number')
        }

        if ( navigator.platform != "iPad" && navigator.platform != "iPhone" && navigator.platform != "iPod" )
		    return SpellMath.percentualOf(percentual, window.innerHeight) * window.devicePixelRatio
        return SpellMath.percentualOf(percentual, document.body.getBoundingClientRect().height)
    }
    
    /**
     * return window current dimensions
     */
    getWindowDimensions(){
        if(screen.width && screen.height && this.isMobile()){
            return {
                width: screen.width,
                height: screen.height
            }
        }else{
            return { 
                width: Math.max(
                    document.body.scrollWidth, document.documentElement.scrollWidth,
                    document.body.offsetWidth, document.documentElement.offsetWidth,
                    document.body.clientWidth, document.documentElement.clientWidth
                ), 
                height:  Math.max(
                    document.body.scrollHeight, document.documentElement.scrollHeight,
                    document.body.offsetHeight, document.documentElement.offsetHeight,
                    document.body.clientHeight, document.documentElement.clientHeight
                )
            }
        }
    }

    /**
     * Fix blurry canvas line
     */
    fixDpi() {
        const styleHeight = +getComputedStyle(this.element).getPropertyValue("height").slice(0, -2)
        const styleWidth = +getComputedStyle(this.element).getPropertyValue("width").slice(0, -2)
        this.element.setAttribute('height', styleHeight * window.devicePixelRatio)
        this.element.setAttribute('width', styleWidth * window.devicePixelRatio)
    }

    /**
     * Draw single pixel on screen
     */
    drawPixel(x, y, color, pixelW = 10, pixelH = 10) {
        if(typeof pixelH === 'undefined'){
            pixelH = pixelW
        }
        this.context.fillStyle = color
        this.context.fillRect(x, y, pixelW, pixelH)
        this.context.fillRect(x, y, pixelW, pixelH)
        return this
    }

    drawPixelArray(pixels){
        if(typeof pixels !== 'object'){
            throw new Error('SPELL:', 'you must send an array of pixels')
        }
        pixels.forEach((pixel) => {
            this.drawPixel(...pixel)
        })
    }

    /**
     * Draw array of pixel bimaps
     * @param {*} spriteClasses 
     */
    drawPixelSprites(spriteClasses){
        spriteClasses.forEach((sprite) => this.drawPixelSprite(sprite))
    }

    /**
     * Draw single pixel bitmap
     */
    drawPixelSprite(spriteClass) {
        let x = spriteClass.position.x
        let y = spriteClass.position.y
        
        const colors = spriteClass.colors
        const sprite = spriteClass.bitmap
        
        if(!sprite) return false

        const originalX = x
        sprite.forEach(row => {
            row.forEach((pixel, i) => {
                this.drawPixel(x, y, colors[pixel], spriteClass.pixelSize, spriteClass.pixelSize)
                x += spriteClass.pixelSize
                if (i === row.length - 1) x = originalX
            })
            y += spriteClass.pixelSize
        })
        return this
    }

    __drawImageOnCanvas(sprite){
        let { x, y } = sprite.position
        let { width, height, angle, element } = sprite

        if (typeof angle !== 'undefined'){
            const xx = width / 2
            const yy = height / 2
            const rad = SpellMath.getRadians(angle)

            this.context.save()
            this.context.translate(x + xx, y + yy)
            this.context.rotate(rad)
            this.context.drawImage(element, -xx, -yy, width, height)
            this.context.restore()    
        }else{
            this.context.drawImage(sprite.element, x, y, width, height)
        }
    }

    setBackgroundColor = (color) => {
        this.context.fillStyle = color
        this.context.fillRect(0, 0, this.element.width, this.element.height)
        return this
    }

    drawText( text, color, size, x, y , font ) {
        if(typeof text !== 'string'){
            font = text.font
            x = text.position.x
            y = text.position.y
            size = text.size
            color = text.color
            text = text.text
        }

        this.context.textAlign = "center"
        this.context.fillStyle = color
        this.context.font = `${size}px ${font ? font : 'Arial'}`;
        this.context.fillText(text, x, y);
    }
}