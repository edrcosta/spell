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
     */
    preload(imageList){
        // start download images as spell sprite instances
        this.imageList = imageList
        
        Object.keys(this.imageList).forEach(this.preloadImage)
        
        // await preloading images and initialize the game
        Promise.all(this.loading).then(() => {
            setTimeout(this.afterLoadHanddle, 1000);
        })

        return this
    }

    /**
     * Triggers the game start
     */
    afterLoadHanddle = () => {
        this.loaded = true           
        this.afterLoadCallback({ images: this.imageList })
        if(DEBUG) {
            console.log('SPELL: All assets loaded')
        }
    }

    /**
     * Preloads a single image file
     * @param {string} id 
     */
    preloadImage = (id) => {
        const path = this.imageList[id]

        // instance of sprite
        this.imageList[id] = new SpellSprite()
        // set image
        this.loading.push(this.imageList[id].setImageFile(path)) 

        if(DEBUG && DEBUG_SPRITE_LOADING){
            console.log('downloading:', this.imageList[id])
        }
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