import Spell from '../..';
import GameState from '../gamestate';
import SpellScrollingComponent from './component';

export default class AnimationComponentItem extends SpellScrollingComponent {
    frameCount = 0;

    initialize (position, meta) {
        this.age = meta?.age | 0;
        this.metadata.position = position;
        this.createInstance();
    }

    createInstance () {
        const x = this.sprite ? this.sprite.position.x : this.metadata.position.x;
        const y = this.sprite ? this.sprite.position.y : this.metadata.position.y;

        this.sprite = GameState.runtime.images[this.sprites[this.age]].clone();
        this.sprite.position.x = Number(x);
        this.sprite.position.y = Number(y);
    }

    isRenderFrame () {
        return this.frameCount === this.frameRate;
    }

    incrementSprite () {
        this.age++;
        this.frameCount = 0;

        if (this.age === this.sprites.length) {
            this.age = 0;
        }
    }

    render () {
        this.frameCount++;

        if (typeof this.customFrameRate === 'function' && this.customFrameRate(this.frameCount)) {
            this.incrementSprite();
        } else if (this.isRenderFrame()) {
            this.incrementSprite();
        }

        this.createInstance();

        Spell.canvas.drawImage(this.sprite);
    }
}
