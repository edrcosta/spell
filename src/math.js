import SpellMathCache from './memory-cache';

export default class SpellMath {
    disableCache = false;

    getRandomNumber (min, max) {
        if (typeof min !== 'number' || typeof max !== 'number') {
            throw new Error('SPELL: getRandomNumber parameters must be numbers');
        }

        if (min > max) {
            throw new Error('SPELL: min must be less or equal max');
        }

        min = Math.ceil(min);
        return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min;
    }

    getRandomElement (array) {
        return array[this.getRandomNumber(0, (array.length - 1))];
    }

    getRandomBool (min, max) {
        if (min > max) {
            throw new Error('SPELL: min must be less or equal max');
        }

        min = min || 0;
        max = max || 10;

        const rand = Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min;
        return rand >= 5;
    }

    getTriangleByHipAngle (hipot, angle) {
        const id = `${hipot}-${hipot}-getTriangleByHipAngle`;

        const cached = SpellMathCache.get(id, this.disableCache);
        if (cached) {
            return cached;
        }

        const ang = angle * (Math.PI / 180);
        const res = {
            catop: Math.sin(ang) * hipot,
            catadj: Math.cos(ang) * hipot
        };

        return SpellMathCache.add(id, res, this.disableCache);
    }

    getRadians (angle) {
        const id = `${angle}-radian`;

        const cached = SpellMathCache.get(id, this.disableCache);
        if (cached) {
            return cached;
        }

        const op = angle * Math.PI / 180;

        return SpellMathCache.add(id, op, this.disableCache);
    }

    percentualOf (percent, ofValue) {
        const id = `${percent}/100*${ofValue}`;

        const cached = SpellMathCache.get(id, this.disableCache);
        if (cached) return cached;

        const op = percent / 100 * ofValue;

        return SpellMathCache.add(id, op, this.disableCache);
    }

    colorToRGB (hex) {
        const cached = SpellMathCache.get(hex, this.disableCache);
        if (cached) return cached;

        hex = hex.replace(/^#/, '');
        // Parse the hex value to separate R, G, B components
        const bigint = parseInt(hex, 16);

        // shift left to get the values
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return SpellMathCache.add(hex, { r, g, b }, this.disableCache);
    }
}
