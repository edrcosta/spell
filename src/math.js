import SpellMathCache from './memory-cache'

export default class SpellMath {
    static getRandomNumber(min, max) {
        if(typeof min !== 'number' || typeof max !== 'number'){
            throw new Error('SPELL: getRandomInt parameters must be numbers')
        }

        if(min > max){
            throw new Error('SPELL: min must be less or equal max')
        }

        min = Math.ceil(min)
        return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min
    }

    static getRandomElement(array){
        return array[this.getRandomInt(0, (array.length - 1))]
    }

    static getRadians(angle){
        const id = `${angle}-radian`

        const cached = SpellMathCache.get(id)
        if(cached){
            return cached
        }
        
        const op = angle * Math.PI / 180

        return SpellMathCache.add(id, op)
    }

    static percentualOf(percent, ofValue){
        const id = `${percent}/100*${ofValue}`

        const cached = SpellMathCache.get(id)
        if(cached) return cached

        const op = percent / 100 * ofValue
        
        return SpellMathCache.add(id, op)
    }
}