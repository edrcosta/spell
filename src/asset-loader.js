import SpellSprite from './sprite'
import Spell from './spell'

export default class SpellLoader {
    loadingList = []
    afterLoadCallback

    async preload({ images, audios }){
        this.images = images

        Object.keys(this.images).forEach(this.preloadImage)

        await this.downloadAllImages()
        
        return this
    }

    downloadAllImages = () => Promise.allSettled(this.loadingList).then(() => {
        if(typeof this.afterLoadCallback === 'function'){
            this.afterLoadCallback({ images: this.images })

            if(Spell.debug.get('DEBUG_SPRITE_LOADING') && Spell.debug.get('DEBUG')) {
                console.log('SPELL: All assets loaded')
            }
        }
    })

    preloadImage = (id) => {
        const image = this.images[id]
        const sprite = new SpellSprite()

        const assetDownload = sprite.setImageFile(image.url, image.size )
        
        this.loadingList.push(assetDownload) 

        if(Spell.debug.get('DEBUG') & Spell.debug.get('DEBUG_SPRITE_LOADING')){
            console.log('start downloading:', image.url)
        }
        this.images[id] = sprite
    }

    afterLoad(callback){
        if(typeof callback === 'function'){
            this.afterLoadCallback = callback
        }else{
            throw new Error('SPELL: Afterloading callback must be a function')
        }
    }
}