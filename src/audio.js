export default class SpellAudio
{
    static files = {}
    static playing = {}
    static playngIds = []

    static play(id, duplicate){
        if(duplicate === true){
            const audio = new Audio(SpellAudio.files[id].url)
            
            audio.play()
            
        }else if(SpellAudio.playngIds.indexOf(id) === -1){
            
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

    static stop(id){
        if(typeof SpellAudio.playing[id] === 'undefined'){
            return false;
        }
        SpellAudio.playing[id].pause()
        SpellAudio.playing[id].currentTime = 0
    }

    static load({id, url, loop}){
        SpellAudio.files[id] = { url, loop }
    }
}