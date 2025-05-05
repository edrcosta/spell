import GameState from '../gamestate';

export default class RigidComponentItem {
    initialize (position, meta) {
        this.age = meta?.age || 0;
        const current = this.sprites[this.age];

        this.rigidAreas = [current.rigid];
        this.sprite = GameState.runtime.images[current.id].clone();
        this.sprite.position.x = Number(position.x);
        this.sprite.position.y = Number(position.y);
    }
}
