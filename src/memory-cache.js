export default class SpellMathCache
{
    static memory  = {}
    
    /**
     * Add a key value pair into a cache namespace
     * @param {string} id 
     * @param {any} value 
     * @returns 
     */
    static add(id, value){
        SpellMathCache.memory[id] = value
        return SpellMathCache.memory[id]
    }

    /**
     * 
     * @param {string} id 
     * @returns 
     */
    static get(id){
        return SpellMathCache.memory[id]
    }
}