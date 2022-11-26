export let DEBUG = false; // Enable or disable all debug consoles
export let DEBUG_PERFORMANCE = false;// display frame rendering time in ms
export let DEBUG_SPRITE_LOADING = false;// display image / sprite preloading status / list

export default class SpellDebugger {
    enable(setting){
        switch (setting) {
            case 'DEBUG':
                return DEBUG = true;
            case 'DEBUG_PERFORMANCE':
                return DEBUG_PERFORMANCE = true;
            case 'DEBUG_SPRITE_LOADING':
                return DEBUG_SPRITE_LOADING = true;
        }
    }

    disable(setting){
        switch (setting) {
            case 'DEBUG':
                return DEBUG = false;
            case 'DEBUG_PERFORMANCE':
                return DEBUG_PERFORMANCE = false;
            case 'DEBUG_SPRITE_LOADING':
                return DEBUG_SPRITE_LOADING = false;
        }
    }
}