import SpellMathCache from './memory-cache';
const { wrapInCache } = SpellMathCache;

export default class SpellMath {
    getRandomNumber (min, max) {
        if (typeof min !== 'number' || typeof max !== 'number') throw new Error('SPELL: getRandomNumber parameters must be numbers');
        if (min > max) throw new Error('SPELL: min must be less or equal max');

        min = Math.ceil(min);
        return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min;
    }

    getRandomElement = (array) => {
        return array[this.getRandomNumber(0, (array.length - 1))];
    };

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

        return wrapInCache(id, () => {
            const ang = angle * (Math.PI / 180);

            return {
                catop: Math.sin(ang) * hipot,
                catadj: Math.cos(ang) * hipot
            };
        });
    }

    getRadians (angle) {
        const id = `${angle}-radian`;
        wrapInCache(id, () => angle * Math.PI / 180);
    }

    percentualOf (percent, ofValue) {
        const id = `${percent}/100*${ofValue}`;

        return wrapInCache(id, () => percent / 100 * ofValue);
    }

    colorToRGB (hex) {
        return wrapInCache(hex, () => {
            hex = hex.replace(/^#/, '');
            // Parse the hex value to separate R, G, B components
            const bigint = parseInt(hex, 16);

            // shift left to get the values
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;

            return { r, g, b };
        });
    }
}
