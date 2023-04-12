import Spell from './spell'

export default class SpellColision {
    elements = {}

    addElement(id){
        this.elements[id] = {
            position: { x: 0, y: 0 },
            size: { width: 0, height: 0 }
        }
    }

    throwIfNotFound(id){
        if(typeof this.elements[id] === 'undefined'){
            throw new Error(`SPELL: colision element "${id}" not found`)
        }
    }

    isOnScreen = (id) => {
        this.throwIfNotFound(id)
        return this.elements[id].position.x !== false && this.elements[id].position.y !== false
    }

    setPosition(id, position){
        this.throwIfNotFound(id)
        let { x, y } = position

        if(x > (Spell.canvas.horizontal(100) + 200) || x < -200)
            x = false // Out of screen
        if(y > (Spell.canvas.vertical(100) + 200) || y < -200)
            y = false // Out of screen

        this.elements[id].position = { x, y }
    }

    setSize(id, size){
        this.throwIfNotFound(id)
        const {  width, height } = size
        this.elements[id].size = { width, height }
    }

    debug(id){
        this.throwIfNotFound(id)
        if(this.isOnScreen(id)){
            const element = this.elements[id]
            Spell.canvas.drawPixel(element.position.x, element.position.y, 'red', element.size.width, element.size.height)
        }
    }

    isColidingHorizontal = (a, b) => a.position.x < b.position.x + b.size.width && a.position.x + a.size.width > b.position.x

    isColidingVertical = (a, b) => a.position.y < b.position.y + b.size.height && a.size.height + a.position.y > b.position.y

    checkBoxColision(aId, bId){
        this.throwIfNotFound(aId)
        this.throwIfNotFound(bId)

        if(this.isOnScreen(aId) && this.isOnScreen(bId)){           
            const a = this.elements[aId]
            const b = this.elements[bId]
            return this.isColidingHorizontal(a, b) && this.isColidingVertical(a, b)
        }
        return false
    }

    checkBoxColisionHorizontal(aId, bId){
        this.throwIfNotFound(aId)
        this.throwIfNotFound(bId)
        
        if(this.isOnScreen(aId) && this.isOnScreen(bId)){    
            return this.isColidingHorizontal(this.elements[aId], this.elements[bId])
        }
        return false
    }
}