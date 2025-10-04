import SpellScrollingComponent from './component';

export default class CustomComponentItem extends SpellScrollingComponent {
    custom = true;

    preInitialize (meta, { width = 0, height = 0, color = 'red' }) {
        let { x, y } = meta;

        this.metadata = meta;
        this.sprite.width = width;
        this.sprite.height = height;
        this.color = color;

        const xx = x -= (this.sprite.width / 2);
        const yy = y -= (this.sprite.height / 2);

        this.sprite.position = { x: xx, y: yy };
    }
}
