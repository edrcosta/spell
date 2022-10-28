export default class SpellKeyboard {
    static keyPress = {};
    static listener

    static resetKeyboard(keys){
        for (let i = 0; i < keys.length; i++) 
            this.keyPress[keys[i]] = false;
    }

    static startListemKeyboard = (keys) => {
        if (!this.keyPress)
            this.resetKeyboard(keys)
        if (typeof window.keypress.Listener === undefined)
            throw 'You need to import keypress-2.1.5 library';

        SpellKeyboard.listener = new window.keypress.Listener();

        keys.forEach((key) => {
            SpellKeyboard.listener.counting_combo(key, () => { this.keyPress[key] = true });
        })
    }

    static stopListem(){
        SpellKeyboard.listener.stop_listening()
    }
}