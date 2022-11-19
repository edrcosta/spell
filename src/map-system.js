import SpellMathCache from "./memory-cache"
import Spell from "./spell"

/**
 * This class its for rendering tile maps based on multidimension a array
 * to simplify level generation
 */
export default class SpellMap {
    static map
    static mapObjects = {}
    static tileObjects = {}
    static tileSize = 0
    static position = { x: 0, y: 0}
    
    static create(rowNumber, colNumber, tileSize){
        SpellMap.tileSize = tileSize
        SpellMap.map = []

        for (let y = 0; y < rowNumber; y++) {
            SpellMap.map[y] = []
            for (let x = 0; x < colNumber; x++) {
                SpellMap.map[y][x] = 0
            }
        }
    }

    static setPosition = ({x, y}) => SpellMap.position = {x, y}

    static addTile = (sprite, id) => SpellMap.tileObjects[id] = sprite.clone()

    static mapTile = (id, position) => SpellMap.map[position.y][position.x] = id

    static setMap = (map) => SpellMap.map = map

    static render(showEmpty){        
        let mapPosX = SpellMathCache.get('mapPosX')
        let mapPosY = SpellMathCache.get('mapPosY')

        if(!mapPosX || !mapPosY){
            mapPosX = SpellMathCache.add('mapPosX', ((SpellMap.tileSize * SpellMap.map[0].length ) / 2))
            mapPosY = SpellMathCache.add('mapPosY', ((SpellMap.tileSize * SpellMap.map.length ) / 2))
        }
        
        SpellMap.map.forEach((row, yy) => {
            row.forEach((objectId, xx) => {
                const object = SpellMap.tileObjects[objectId]
                const tileX = xx * SpellMap.tileSize
                const tileY = yy * SpellMap.tileSize

                if(typeof object !== 'undefined' && object !== 0){
                    // render regular tile image
                    object.setPosition({ 
                        x: (SpellMap.position.x + tileX) - mapPosX + SpellMap.tileSize / 2, 
                        y : (SpellMap.position.y + tileY) - mapPosY + SpellMap.tileSize / 2
                    })
                    Spell.canvas.drawImage(object)
                }else if(showEmpty){
                    // render empty block for debugging
                    const x = (SpellMap.position.x + tileX) - mapPosX 
                    const y = (SpellMap.position.y  + tileY) - mapPosY
                    Spell.canvas.drawPixel(x, y, 'red', SpellMap.tileSize, SpellMap.tileSize)
                }
            })
        });
    }
}