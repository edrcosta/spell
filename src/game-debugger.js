// export let DEBUG = true; // Enable or disable all debug consoles
// export let DEBUG_PERFORMANCE = true;// display frame rendering time in ms

export default class SpellDebugger {
    
    settings = {
        DEBUG: false,
        DEBUG_PERFORMANCE: false,
        DEBUG_SPRITE_LOADING: false,
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