import Spell from '../index';

export default class GameComponents {
    static renderComponent (component) {
        component.class.sprite.position.x = component.position.x + Spell.scrolling.GameState.persistent.position.x;
        component.class.sprite.position.y = component.position.y + Spell.scrolling.GameState.persistent.position.y;

        if (!GameComponents.isVisible(component.class.sprite)) return;

        if (component.class.custom === true) {
            component.class.render();
        } else {
            Spell.canvas.setLayer(component.class.layer ? component.class.layer : 0);
            Spell.canvas.drawImage(component.class.sprite);
        }
    }

    static isVisible = (sprite) => {
        const { x, y } = sprite.position;

        if (sprite.width > Spell.window.horizontal(20)) {
            return true;
        }

        if (sprite.height > Spell.window.vertical(20)) {
            return true;
        }

        return x >= -(Spell.window.horizontal(150)) &&
            y >= -(Spell.window.horizontal(150)) &&
            x < (Spell.window.horizontal(150) + sprite.width) &&
            y < (Spell.window.vertical(150) + sprite.height);
    };

    static isCloserToUser = (sprite) => {
        if (sprite.width > Spell.window.horizontal(20)) {
            return true;
        }

        if (sprite.height > Spell.window.vertical(20)) {
            return true;
        }

        const { x, y } = sprite.position;

        const boundX = Spell.scrolling.GameState.runtime.playerScreenPosition.x - 30;
        const boundY = Spell.scrolling.GameState.runtime.playerScreenPosition.y - 30;

        const w = sprite.width << 2;
        const h = sprite.height << 2;

        return x > boundX - w &&
                y > boundY - h &&
                x < boundX + w &&
                y < boundY + h;
    };
}
