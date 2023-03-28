export default class SpellDebugger {
    settings = {
        DEBUG: true,
        DEBUG_PERFORMANCE: true,
        DEBUG_SPRITE_LOADING: true,
    }

    get(setting){
        if(typeof this.settings[setting] === 'boolean'){
            return this.settings[setting]
        }
        console.error('SPELL:', setting, 'does not exist')
        return false
    }

    enable(setting){
        if(typeof this.settings[setting] === 'boolean'){
            this.settings[setting] = true
        }
    }

    disable(setting){
        if(typeof this.settings[setting] === 'boolean'){
            this.settings[setting] = false
        }
    }

    toogle(setting){
        if(typeof this.settings[setting] === 'boolean'){
            this.settings[setting] = !this.settings[setting]
        }
    }
}