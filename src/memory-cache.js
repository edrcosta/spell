export default class SpellMathCache {
    static memory = {};

    static add (id, value) {
        SpellMathCache.memory[id] = value;
        return SpellMathCache.memory[id];
    }

    static get (id) {
        return typeof SpellMathCache.memory[id] !== 'undefined' ? SpellMathCache.memory[id] : false;
    }

    static wrapInCache (id, operationCallback) {
        const cached = SpellMathCache.get(id);

        if (cached) return cached;

        return SpellMathCache.add(id, operationCallback());
    }
}
