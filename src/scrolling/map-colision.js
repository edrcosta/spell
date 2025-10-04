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

        this.createPlayerColidableElement({
            id: 'main-player',
            width: size.width,
            height: size.height
        });

        const rigidAreas = Spell.scrolling.GameState.get('player', 'runtime').rigidAreas || [];

        for (let i = 0; i < rigidAreas.length; i++) {
            const area = rigidAreas[i];
            this.createColidableElement({
                id: `player-${i}`,
                width: area.width,
                height: area.height
            });
        }
    }

    createPlayerColidableElement ({
        id,
        width,
        height
    }) {
        const pos = Spell.scrolling.GameState.runtime.playerScreenPosition;
        const position = {
            x: pos.x,
            y: pos.y
        };

        Spell.colision.addElement(id);
        Spell.colision.setPosition(id, position);
        Spell.colision.setSize(id, {
            width: Number(width),
            height: Number(height)
        });
    }

    checkColision () {
        const debugColision = Spell.debug.get('COLISION');

        let isColiding = false;
        this.element = false;

        for (const id of this.colidable) {
            let isElementColiding = false;

            if (Spell.colision.checkBoxColision('main-player', id)) {
                isColiding = true;
                isElementColiding = true;
                this.onColisionWith(id);
            }

            const rigidAreas = Spell.scrolling.GameState.get('player', 'runtime').rigidAreas || [];

            for (let i = 0; i < rigidAreas.length; i++) {
                if (Spell.colision.checkBoxColision(`player-${i}`, id)) {
                    isColiding = true;
                    isElementColiding = true;
                    this.onColisionWith(id);
                }
            }

            if (debugColision) {
                Spell.colision.debug('main-player', true, isColiding ? 'red' : '#b5b1a5');
                Spell.colision.debug(id, true, isElementColiding ? 'red' : 'grey');

                const rigidAreas = Spell.scrolling.GameState.get('player', 'runtime').rigidAreas || [];

                for (let i = 0; i < rigidAreas.length; i++) {
                    Spell.colision.debug(`player-${i}`, true);
                }
            }
        }
        return isColiding ? this.element : false;
    }

    onColisionWith (id) {
        this.element = this.components[id];

        if (typeof this.element.class.onColision === 'function') {
            this.components[id].class.onColision();
        }
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

        Spell.scrolling.GameState.get('colisionCheckList').forEach(this.createColidableElement);

        return this.checkColision();
    }
}
