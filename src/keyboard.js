import Spell from "./spell";

export default class SpellKeyboard {
    keyPress = {};
    listener
    keys = []

    setKeyboard = (keys) => this.keys = keys

    resetKeyboard(){
        for (let i = 0; i < this.keys.length; i++) 
            this.keyPress[this.keys[i]] = false;
    }

    startListemKeyboard = () => {
        if (!this.keyPress)
            this.resetKeyboard(this.keys)
        if (typeof window.keypress.Listener === undefined)
            throw 'You need to import keypress-2.1.5 library';

        if(this.keys.length === 0){
            return false
        }

        this.listener = new window.keypress.Listener();

        this.keys.forEach((key) => {
            this.listener.counting_combo(key, () => { this.keyPress[key] = true });
        })

        this.listener.sequence_combo("shift d d", function() {
            if(Spell.debug.get('DEBUG_PERFORMANCE') === true){
                Spell.debug.disable('DEBUG')
                Spell.debug.disable('DEBUG_PERFORMANCE')
            }else{
                Spell.debug.enable('DEBUG')
                Spell.debug.enable('DEBUG_PERFORMANCE')
            }
        }, true);
    }

    stopListem(){
        this.listener.stop_listening()
    }
}