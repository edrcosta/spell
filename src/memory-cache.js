export default class SpellMathCache
{
    static memory  = {}
    
    static add(id, value){
        SpellMathCache.memory[id] = value
        return SpellMathCache.memory[id]
    }

    static get(id){
        return SpellMathCache.memory[id]
    }
}