import SpellMathCache from './memory-cache'

export default class SpellMath {
    static getRandomNumber(min, max) {
        if(typeof min !== 'number' || typeof max !== 'number'){
            throw new Error('SPELL: getRandomNumber parameters must be numbers')
        }

        if(min > max){
            throw new Error('SPELL: min must be less or equal max')
        }

        min = Math.ceil(min)
        return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min
    }

    static getRandomElement(array){
        return array[this.getRandomNumber(0, (array.length - 1))]
    }

    static getTriangleByHipAngle(hipot, angle){
        const ang = angle*(Math.PI/180);
        return {
            catop: Math.sin(ang)*hipot,
            catadj: Math.cos(ang)*hipot,
        }
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

    static  colorToRGB(hex) {
        return {
            r: parseInt(hex.slice(1, 3), 16),
            g: parseInt(hex.slice(3, 5), 16),
            b: parseInt(hex.slice(5, 7), 16),
        }
      }
}