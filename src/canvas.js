import Spell from "./spell";

export default class SpellCanvasRenderEngine {
    element
    context
    stampEnabled = false

    constructor(canvasId) {
        let element = document.getElementById(canvasId)
        if(!element){
            throw new Error('SPELL: You must set a valid canvas ID');
        }
        this.element = element
        this.context = element.getContext('2d')
    }    

    clear = () => this.context.clearRect(0, 0, this.element.width, this.element.height)

    show = () => this.element.style.display = 'block'
    
    setBackgroundColor = (color) => {
        this.context.fillStyle = color
        this.context.fillRect(0, 0, this.element.width, this.element.height)
    }
    
    renderText({ text, color, size, position , font  }){
        const { x, y } = position
        this.context.textAlign = "center"
        this.context.fillStyle = color
        this.context.font = `${size}px ${font ? font : 'Arial'}`;
        this.context.fillText(text, x, y);
    }
    
    drawLine({ from, to, color, width }){
        this.context.beginPath();
        this.context.moveTo(from.x, from.y);
        this.context.lineTo(to.x, to.y);
        this.context.strokeStyle = color ? color : '#000';
        this.context.lineWidth = width ? width : 1;
        this.context.stroke();
    }
    
    drawImageOnCanvas = (sprite) => {
        let { x, y } = sprite.position
        let { width, height, angle, element } = sprite

        if (typeof angle !== 'undefined'){
            const xx = width / 2
            const yy = height / 2
            const rad = angle !== 0 ? Spell.math.getRadians(angle) : 0
            this.context.save()
            this.context.translate(x + xx, y + yy)
            this.context.rotate(rad)
            
            if(this.stampEnabled) 
                this.renderPixel({x: sprite.position.x, y: sprite.position.y, color: '#F9F5EF', width: sprite.width, height: sprite.height })

            this.context.drawImage(element, -xx, -yy, width, height)
            
            if(this.stampEnabled)
                this.renderPixel({x: sprite.previousPos.x, y: sprite.previousPos.y, color: '#F9F5EF', width: sprite.width, height: sprite.height })
            this.context.restore()
        }else{
            if(this.stampEnabled)
                this.renderPixel({x: sprite.position.x, y: sprite.position.y, color: '#F9F5EF', width: sprite.width, height: sprite.height })
            this.context.drawImage(sprite.element, x, y, width, height)
            if(this.stampEnabled)
                this.renderPixel({x: sprite.previousPos.x, y: sprite.previousPos.y, color: '#F9F5EF', width: sprite.width, height: sprite.height })
        }
    }

    renderPixel({x, y, color, pixelW, pixelH}){
        if(typeof pixelH === 'undefined') pixelH = pixelW
        this.context.fillStyle = color
        this.context.fillRect(x, y, pixelW, pixelH)
        this.context.fillRect(x, y, pixelW, pixelH)
    }
}