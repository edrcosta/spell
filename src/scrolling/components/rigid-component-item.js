import GameState from '../gamestate';

export default class RigidComponentItem {
    custom = false;
    sprite = {
        width: 0,
        height: 0,
        position: {
            x: 0,
            y: 0
        }
    };

    rigidAreas = [];

    initialize (position, meta) {
        this.age = meta?.age || 0;
        const current = this.sprites[this.age];

        this.rigidAreas = [current.rigid];
        this.sprite = GameState.runtime.images[current.id].clone();
        this.sprite.position.x = Number(position.x);
        this.sprite.position.y = Number(position.y);
    }
}
