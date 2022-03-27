import SpellMathCache from './memory-cache'

/**
 * Why a simple math class? because we gona memory cache LOL 
 * @todo memory check
 */
export default class SpellMath {
    /**
     * return a random number bettween a range
     * @param {*} min 
     * @param {*} max 
     * @returns 
     */
    static getRandomInt(min, max) {
        min = Math.ceil(min)
        return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min
    }

    /**
     * get a random item from an array 
     * 
     * @param {*} array 
     * @returns 
     */
    static getRandomElement(array){
        return array[this.getRandomInt(0, (array.length - 1))]
    }

    /**
     * Return the relative percentual of a number and cache the result
     * @param {Number} percent 
     * @param {Number} ofValue 
     * @returns 
     */
    static percentualOf(percent, ofValue){
        const id = `${percent}/100*${ofValue}`

        const cached = SpellMathCache.get(id)
        if(cached){
            return cached
        }

        const op = percent / 100 * ofValue
        
        return SpellMathCache.add(id, op)
    }

    /**
     * Return a number / 2 and cache the result
     * @param {*} value 
     * @returns 
     */
    static halfOf(value){
        const id = `${value}/2`

        const cached = SpellMathCache.get(id)
        if(cached){
            return cached
        }
        
        const op = value / 2

        return SpellMathCache.add(id, op)
    }

    static multiply(a, b){
        const id = `${a}__M__${b}`

        const cached = SpellMathCache.get(id)
        if(cached) {
            return cached
        }
        
        const op = a* b

        return SpellMathCache.add(id, op)
    }

    static divide(a, b){
        const id = `${a}__D__${b}`

        const cached = SpellMathCache.get(id)
        if(cached) {
            return cached
        }
        
        const op = a / b

        return SpellMathCache.add(id, op)
    }

    static cachedOp(id_, opcallback){
        const id = `${id_}__cached`

        const cached = SpellMathCache.get(id)
        if(cached) {
            return cached
        }

        const op = opcallback()

        return SpellMathCache.add(id, op)
    }
}