export default class SpellAudio
{
    static files = {}
    static playing = {}
    static playngIds = []

    /**
     * Play a sound by ID
     * @param { string } id 
     * @param { boolean } duplicate 
     */
    static play(id, duplicate){
        if(duplicate === true){
            // Allow play multiple instances of the same sound like bullet sounds
            const audio = new Audio(SpellAudio.files[id].url)            
            audio.play()
        }else if(SpellAudio.playngIds.indexOf(id) === -1){
            // Play sounds that will not be repeated multiple times
            const audio = new Audio(SpellAudio.files[id].url)
            if(SpellAudio.files[id].loop === true){
                audio.loop = true
            }

            SpellAudio.playing[id] = audio
            SpellAudio.playing[id].play()
            if(!SpellAudio.playing[id].paused){
                SpellAudio.playngIds.push(id)
            }
        }
    }

    /**
     * Stop a song by ID
     * @param {string} id 
     * @returns 
     */
    static stop(id){
        if(typeof SpellAudio.playing[id] === 'undefined'){
            return false;
        }
        SpellAudio.playing[id].pause()
        SpellAudio.playing[id].currentTime = 0
    }

    /**
     * Load a audio file
     */
    static load({id, url, loop}){
        SpellAudio.files[id] = { url, loop }
    }
}