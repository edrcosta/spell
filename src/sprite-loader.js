import SpellSprite from './sprite'
import { DEBUG_PERFORMANCE, DEBUG, DEBUG_SPRITE_LOADING } from './game-debugger'

export default class SpellLoader {
    loading = []
    spell
    loaded = false
    afterLoadCallback

    constructor(spell){
        this.spell = spell
    }

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
        const path = this.imageList[id]

        this.imageList[id] = new SpellSprite()
        this.loading.push(this.imageList[id].setImageFile(path)) 

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