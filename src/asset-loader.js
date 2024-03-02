import SpellSprite from './sprite';
import Spell from '.';

export default class SpellLoader {
    loadingList = [];
    afterLoadCallback;
    images = {};

    async preload ({ images, audios }) {
        this.images = images;

        Object.keys(this.images).map(this.preloadImage);

        await Promise.allSettled(this.loadingList);

        return {
            images: this.images
        };
    }

    preloadImage = (id) => {
        const image = this.images[id];
        const sprite = new SpellSprite();
        const assetDownload = sprite.setImageFile(image.url, image.size);

        this.loadingList.push(assetDownload);

        if (Spell.debug.get('DEBUG') & Spell.debug.get('DEBUG_SPRITE_LOADING')) {
            console.log('start downloading:', image.url);
        }
        this.images[id] = sprite;
    };
}
