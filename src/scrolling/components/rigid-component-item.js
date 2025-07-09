import GameState from '../gamestate';
import SpellScrollingComponent from './component';

export default class RigidComponentItem extends SpellScrollingComponent {
    initialize ({ x, y }, { age = 0 }) {
        this.age = age;
        const current = this.sprites[age];

        this.rigidAreas = [current.rigid];
        this.sprite = GameState.runtime.images[current.id].clone();
        this.sprite.position.x = Number(x);
        this.sprite.position.y = Number(y);
    }
}
