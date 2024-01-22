import SpellSprite from './sprite';

export default class SpellAnimation {
    animations = {};

    create (id, { frames, interval }) {
        frames.forEach((frameItem) => {
            if (!(frameItem instanceof SpellSprite)) {
                throw new Error('SPELL: Frames must be an array of sprites');
            }
        });

        this.animations[id] = {
            frames,
            interval,
            currentFrame: 0,
            intervalCount: 0
        };
    }

    isUpdateInterval (id) {
        const interval = this.animations[id].interval;
        const count = this.animations[id].intervalCount++;

        if (interval === count) {
            this.animations[id].intervalCount = 0;
            return true;
        }
        return false;
    }

    incrementAnimationFrame (id) {
        this.animations[id].currentFrame++;
        if (this.animations[id].currentFrame === this.animations[id].frames.length) {
            this.animations[id].currentFrame = 0;
        }
    }

    getCurrentFrame (id) {
        if (typeof this.animations[id] !== 'object') {
            throw new Error(`SPELL: Invalid animation ${id}`);
        }

        if (this.isUpdateInterval(id)) {
            this.incrementAnimationFrame(id);
        }
        const current = this.animations[id].frames[this.animations[id].currentFrame];

        return current;
    }
}
