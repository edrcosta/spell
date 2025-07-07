import Spell from '..';

export default class MapColision {
    colidable = [];
    components = {};
    element = null;

    createColidableElement = (item) => {
        if (Spell.scrolling.GameState.disabled.includes('player')) {
            return false;
        }

        const id = `${item.component.uuid}-${item.component.id}`;

        this.colidable.push(id);
        this.components[id] = item.component;

        Spell.colision.addElement(id);
        Spell.colision.setSize(id, item);
        Spell.colision.setPosition(id, item);
    };

    createPlayerColidable () {
        if (!Spell.scrolling.GameState.runtime.currentPlayerSprite) {
            return false;
        }

        const size = Spell.scrolling.GameState.runtime.currentPlayerSprite;

        Spell.colision.addElement('player');
        Spell.colision.setPosition('player', Spell.scrolling.GameState.runtime.playerScreenPosition);
        Spell.colision.setSize('player', {
            width: Number(size.width),
            height: Number(size.height)
        });
    }

    checkColision () {
        const debugColision = !Spell.scrolling.GameState.disabled.includes('debug.colision');

        let isColiding = false;
        this.element = false;

        for (const id of this.colidable) {
            if (debugColision) {
                Spell.colision.debug('player', true);
                Spell.colision.debug(id, true);
            }

            if (Spell.colision.checkBoxColision('player', id)) {
                this.element = this.components[id];
                isColiding = true;
            }
        }
        return isColiding;
    }

    reset () {
        Spell.colision.elements = {};
        this.colidable = [];
    }

    isColiding () {
        if (Spell.scrolling.GameState.runtime.currentPlayerSprite === null) {
            return false;
        }

        this.reset();
        this.createPlayerColidable();

        Spell.scrolling.GameState.runtime.colisionCheckList.forEach(this.createColidableElement);

        return this.checkColision();
    }
}
