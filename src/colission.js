import { System, Polygon } from 'detect-collisions'

export default class SpellColission {
    system
    objects = {}

    constructor(canvas){
        this.system = new System();
        this.canvas = canvas
    }

    getConners = (box) => [
        { x: box.x, y: box.y },
        { x: box.x + box.width, y:  box.y },
        { x: box.x, y: box.y + box.height },
        { x: box.x + box.width, y:  box.y + box.height }
    ]

    createElementBox(id, box){
        if (typeof this.objects[id] !== 'undefined') return false
        const boxPoligon = this.getConners(box)

        this.objects[id] = {
            width: box.width,
            height: box.height,
            position: { x: box.x, y: box.y },
            poligon: boxPoligon,
            element: new Polygon({ x: box.x, y: box.y }, boxPoligon),
        }

        this.system.insert(this.objects[id].element);
    }

    setPositionOf(id, position){
        this.objects[id].position = position
        this.objects[id].element.setPosition(position.x, position.y)
        this.system.updateBody(this.objects[id].element);
    }

    debug(poligon, color){
        color = typeof color === 'string' ? color : 'green'
        
        poligon.forEach((xxx) => {
            this.canvas.drawPixel(xxx.x, xxx.y, color, 5, 5)
        })
    }

    isTwoBoxesColiding(elementAId, elementBId){


        if (elementBId !== 'box0'){
            return false
        }
        const potentials = this.system.getPotentials(this.objects[elementAId].element);
        console.log(potentials)

        console.log('player', this.objects[elementAId].element.pos.x, this.objects[elementAId].element.pos.y)        
        console.log('box', this.objects[elementBId].element.pos.x, this.objects[elementBId].element.pos.y)
            // console.log(potentials)

        // this.system.getPotentials(this.objects[elementAId].element).forEach((collider) => {
        //     if (this.system.checkCollision(this.objects[elementAId].element, collider)) {
        //       console.log(`COLIDINDOOOOOOOOOOOOOO`)
        //     }
        // });


        // console.log([
        //     this.objects[elementAId],
        //     this.objects[elementBId],
        // ])
        // if (this.system.checkCollision(polygonA, polygonB)) {
        //     console.log("Collision detected!", this.system.response);
        // }

    }
}