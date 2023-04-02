import SpellSprite from './sprite'
import Spell from './spell'

export default class SpellLoader {
    loading = []
    loaded = false
    afterLoadCallback

    imagesLoaded = false

    startLoading(){
        setTimeout(() => {
            if(this.imagesLoaded){
                this.loaded = true           
                this.afterLoadCallback({ images: this.imageList })
                if(Spell.debug.get('DEBUG')) {
                    console.log('SPELL: All assets loaded')
                }
            }
        }, 100);
    }

    preload(imageList){
        // start download images as spell sprite instances
        this.imageList = imageList
        Object.keys(this.imageList).forEach(this.preloadImage)
        
        // await preloading images and initialize the game
        Promise.allSettled(this.loading).then(() => {
            this.imagesLoaded = true
        })
        return this
    }

    preloadImage = (id) => {
        const url = this.imageList[id].url
        const size = this.imageList[id].size

        this.imageList[id] = new SpellSprite()

        if(url){
            this.imageList[id].setImageFile(url, size)
        }

        this.loading.push(this.imageList[id]) 

        if(Spell.debug.get('DEBUG') & Spell.debug.get('DEBUG_SPRITE_LOADING')){
            console.log('downloading:', this.imageList[id])
        }
    }

    afterLoad(callback){
        this.afterLoadCallback = callback
        return this 
    }
}