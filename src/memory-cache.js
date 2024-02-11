export default class SpellMathCache {
    static memory = {};

    static add (id, value, disabled) {
        if (disabled) return value;
        SpellMathCache.memory[id] = value;
        return SpellMathCache.memory[id];
    }

    static get (id, disabled) {
        if (disabled) return null;
        return typeof SpellMathCache.memory[id] !== 'undefined' ? SpellMathCache.memory[id] : false;
    }
}
