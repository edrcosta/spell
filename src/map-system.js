import SpellMathCache from "./memory-cache"
import Spell from "./spell"

/**
 * This class its for rendering tile maps based on multidimension a array
 * to simplify level generation
 */
export default class SpellMap {
    map
    mapObjects = {}
    tileObjects = {}
    tileSize = 0
    position = { x: 0, y: 0}
    
    create(rowNumber, colNumber, tileSize){
        this.tileSize = tileSize
        this.map = []

        for (let y = 0; y < rowNumber; y++) {
            this.map[y] = []
            for (let x = 0; x < colNumber; x++) {
                this.map[y][x] = 0
            }
        }
    }

    setPosition = ({x, y}) => this.position = {x, y}

    addTile = (sprite, id) => this.tileObjects[id] = sprite.clone()

    mapTile = (id, position) => this.map[position.y][position.x] = id

    setMap = (map) => this.map = map

    render(showEmpty){        
        let mapPosX = SpellMathCache.get('mapPosX')
        let mapPosY = SpellMathCache.get('mapPosY')

        if(!mapPosX || !mapPosY){
            mapPosX = SpellMathCache.add('mapPosX', ((this.tileSize * this.map[0].length ) / 2))
            mapPosY = SpellMathCache.add('mapPosY', ((this.tileSize * this.map.length ) / 2))
        }
        
        this.map.forEach((row, yy) => {
            row.forEach((objectId, xx) => {
                const object = this.tileObjects[objectId]
                const tileX = xx * this.tileSize
                const tileY = yy * this.tileSize

                if(typeof object !== 'undefined' && object !== 0){
                    // render regular tile image
                    object.setPosition({ 
                        x: (this.position.x + tileX) - mapPosX + this.tileSize / 2, 
                        y : (this.position.y + tileY) - mapPosY + this.tileSize / 2
                    })
                    Spell.canvas.drawImage(object)
                }else if(showEmpty){
                    // render empty block for debugging
                    const x = (this.position.x + tileX) - mapPosX 
                    const y = (this.position.y  + tileY) - mapPosY
                    Spell.canvas.drawPixel(x, y, 'red', this.tileSize, this.tileSize)
                }
            })
        });
    }
}