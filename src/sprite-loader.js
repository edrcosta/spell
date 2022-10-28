import SpellSprite from './sprite'
import { DEBUG, DEBUG_SPRITE_LOADING } from './game-debugger'
import Spell from './spell'

export default class SpellLoader {
    loading = []
    loaded = false
    afterLoadCallback

    preload(imageList){
        // start download images as spell sprite instances
        this.imageList = imageList

        Object.keys(this.imageList).forEach(this.preloadImage)
        
        // await preloading images and initialize the game
        Promise.all(this.loading).then(() => {
            setTimeout(() => {
                this.loaded = true           
                this.afterLoadCallback({ images: this.imageList })
                if(DEBUG) {
                    console.log('SPELL: All assets loaded')
                }
            }, 100);
        })
        return this
    }

    /** Preload a single image by id */
    preloadImage = (id) => {
        const url = this.imageList[id].url
        const size = this.imageList[id].size
        this.imageList[id] = new SpellSprite(url, size)
        this.loading.push(this.imageList[id]) 

        if(DEBUG && DEBUG_SPRITE_LOADING){
            console.log('downloading:', this.imageList[id])
        }
    }

    /** SET callback called after all assets been loaded */
    afterLoad(callback){
        this.afterLoadCallback = callback
        return this 
    }
}