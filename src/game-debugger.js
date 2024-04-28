export default class SpellDebugger {
    settings = {
        DEBUG: false,
        DEBUG_PERFORMANCE: false,
        DEBUG_SPRITE_LOADING: false
    };

    get = setting => typeof this.settings[setting] === 'boolean' ? this.settings[setting] : undefined;
    modify = (setting, value) => { this.settings[setting] = value; };
    enable = setting => this.modify(setting, true);
    disable = setting => this.modify(setting, false);
    toggle = setting => this.modify(setting, !this.settings[setting]);
}
