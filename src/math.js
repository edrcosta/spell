import SpellMathCache from './memory-cache'

export default class SpellMath {
    static getRandomInt(min, max) {
        min = Math.ceil(min)
        return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min
    }

    static getRandomElement(array){
        return array[this.getRandomInt(0, (array.length - 1))]
    }

    static percentualOf(percent, ofValue){
        const id = `${percent}/100*${ofValue}`

        const cached = SpellMathCache.get(id)
        if(cached){
            return cached
        }

        const op = percent / 100 * ofValue
        
        return SpellMathCache.add(id, op)
    }
}