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

    /**
     * Preloads an image list
     * @param {*} imageList 
     * @returns 
     */
    preload(imageList){
        // start download images as spell sprite instances
        this.imageList = imageList
        Object.keys(this.imageList).forEach((id) => {
            const path = this.imageList[id]
            this.imageList[id] = new SpellSprite() // instance of sprite
            this.loading.push(this.imageList[id].setImageFile(path)) // set image 
            if(DEBUG && DEBUG_SPRITE_LOADING)
                console.log('downloading:', this.imageList[id])
        })

        // await preloading images and initialize the game
        Promise.all(this.loading).then(() => {
            setTimeout(() => {
                this.loaded = true           
                this.afterLoadCallback({ images: this.imageList })
                if(DEBUG) console.log('SPELL: All assets loaded')
            }, 1000);
        })
        return this
    }

    /**
     * Register callback to be evoked when all assets are loaded
     * @param {*} callback 
     * @returns 
     */
    afterLoad(callback){
        this.afterLoadCallback = callback
        return this 
    }
}