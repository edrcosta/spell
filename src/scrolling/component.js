import Spell from '../index';

export default class GameComponents {
    static renderComponent (component) {
        component.class.sprite.position.x = component.position.x + Spell.scrolling.GameState.persistent.position.x;
        component.class.sprite.position.y = component.position.y + Spell.scrolling.GameState.persistent.position.y;

        if (!GameComponents.isVisible(component.class.sprite)) return;

        Spell.canvas.setLayer(component.class.layer || 0);

        if (typeof component.class.render === 'function') {
            component.class.render();
        } else {
            Spell.canvas.drawImage(component.class.sprite);
        }
    }

    static isVisible = (sprite) => {
        const zoomScale = Spell.canvas.getZoomScale();
        const { x, y } = sprite.position;

        const largeWidthThreshold = Spell.window.horizontal(20) / zoomScale;
        const largeHeightThreshold = Spell.window.vertical(20) / zoomScale;

        if (sprite.width > largeWidthThreshold) {
            return true;
        }

        if (sprite.height > largeHeightThreshold) {
            return true;
        }

        const horizontalBound = Spell.window.horizontal(150) / zoomScale;
        const verticalBound = Spell.window.vertical(150) / zoomScale;

        return x >= -horizontalBound &&
            y >= -horizontalBound &&
            x < (horizontalBound + sprite.width) &&
            y < (verticalBound + sprite.height);
    };

    static isCloserToUser = (sprite) => {
        const zoomScale = Spell.canvas.getZoomScale();

        if (sprite.width > Spell.window.horizontal(50)) {
            return true;
        }

        if (sprite.height > Spell.window.vertical(50)) {
            return true;
        }

        const { x, y } = sprite.position;

        const boundX = Spell.scrolling.GameState.runtime.playerScreenPosition.x - 30;
        const boundY = Spell.scrolling.GameState.runtime.playerScreenPosition.y - 30;

        const w = (sprite.width << 2) / zoomScale;
        const h = (sprite.height << 2) / zoomScale;

        return x > boundX - w &&
                y > boundY - h &&
                x < boundX + w &&
                y < boundY + h;
    };
}
