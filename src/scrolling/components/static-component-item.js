import GameState from '../gamestate';
import SpellScrollingComponent from './component';

export default class StaticComponentItem extends SpellScrollingComponent {
    initialize ({ x, y }, meta) {
        this.age = meta?.age | 0;
        this.sprite = GameState.runtime.images[this.sprites[this.age]].clone();
        this.sprite.position.x = Number(x);
        this.sprite.position.y = Number(y);
    }
}
