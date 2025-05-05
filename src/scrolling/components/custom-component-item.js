export default class CustomComponentItem {
    custom = true;
    sprite = {
        width: 100,
        height: 100,
        position: {
            x: 0,
            y: 0
        }
    };

    preInitialize (position, meta) {
        if (meta.size) {
            this.sprite.width = meta.size.width;
            this.sprite.height = meta.size.height;
        }

        if (meta.color) {
            this.color = meta.color;
        }

        let { x, y } = position;

        x = x -= (this.sprite.width / 2);
        y = y -= (this.sprite.height / 2);

        this.sprite.position = { x, y };
    }
}
