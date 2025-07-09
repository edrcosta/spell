import SpellScrollingComponent from './component';

export default class CustomComponentItem extends SpellScrollingComponent {
    custom = true;

    preInitialize ({ x, y }, { width = 0, height = 0, color = 'red' }) {
        this.sprite.width = width;
        this.sprite.height = height;
        this.color = color;

        x = x -= (this.sprite.width / 2);
        y = y -= (this.sprite.height / 2);

        this.sprite.position = { x, y };
    }
}
