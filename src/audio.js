export default class SpellAudio
{
    files = {}
    playing = {}
    playngIds = []

    play(id, duplicate){
        if(duplicate === true){
            // Allow play multiple instances of the same sound like bullet sounds
            (new Audio(this.files[id].url)).play()
        }else if(this.playngIds.indexOf(id) === -1){
            this.playNonRepeatableAudio(id)
        }
    }
    
    playNonRepeatableAudio(id){
        const audio = new Audio(this.files[id].url)
        if(this.files[id].loop === true){
            audio.loop = true
        }
        this.playing[id] = audio
        this.playing[id].play()
        if(!this.playing[id].paused){
            this.playngIds.push(id)
        }
    }

    stop(id){
        this.playing[id].pause()
        this.playing[id].currentTime = 0
        delete this.playngIds[this.playngIds.indexOf(id)]
        this.playngIds.sort()
    }

    load({id, url, loop}){
        this.files[id] = { url, loop }
    }

    isPlaying(id){
        if(typeof this.playing[id] === 'undefined'){
            return false;
        }
        return !this.playing[id].paused
    }
}