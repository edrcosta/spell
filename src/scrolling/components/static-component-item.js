import GameState from '../gamestate';

export default class StaticComponentItem {
    initialize (position, meta) {
        const age = meta?.age ? meta.age : 0;

        this.age = age;
        this.sprite = GameState.runtime.images[this.sprites[this.age]].clone();
        this.sprite.position.x = Number(position.x);
        this.sprite.position.y = Number(position.y);
    }
}
