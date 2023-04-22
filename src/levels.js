import Spell from "./spell"

export default class SpellLevels{
    levels = {}
    current = false

    load({ id, level }){
        const l = new level()
        const { initialize, render } = l
        if(typeof render === 'function' && typeof initialize === 'function'){
            this.levels[id] = l
            if(!this.current){
                initialize()
                this.current = id
                Spell.game.setGameLoop(this.levels[this.current].render)
            }
        }else{
            throw new Error('Spell: for load a level, render and initialize must be a function')
        }
    }

    start(id){
        this.current = id
        this.levels[id].initialize()
        Spell.game.setGameLoop(this.levels[id].render)
    }
}