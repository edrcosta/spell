/**
 * @todo 
 * 
 * this class will be a mapping system to games that require save the position of multiple elements 
 */
export default class SpellMap {
    map = []
    w = null
    h = null
    viewport = null
    viewportSize = null
    viewportSize = 100
    viewport = {
        x: 0,
        y: 0
    }

    constructor({ w, h, viewport, viewportSize }){
        w ? this.w : null
        h ? this.h : null
        viewport ? this.viewport : null
        viewportSize ? this.viewportSize : null
    }

    moveView = ({ x, y }) => {
        this.viewport.x = x
        this.viewport.y = y
    }
}