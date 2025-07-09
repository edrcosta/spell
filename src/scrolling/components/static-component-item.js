import GameState from '../gamestate';
import SpellScrollingComponent from './component';

export default class StaticComponentItem extends SpellScrollingComponent {
    initialize ({ x, y }, { age = 0 }) {
        this.age = age;
        this.sprite = GameState.runtime.images[this.sprites[this.age]].clone();
        this.sprite.position.x = Number(x);
        this.sprite.position.y = Number(y);
    }
}
