import Spell from '..';
import { GameSession } from './game-session';
import GameState from './gamestate';
import hydrateComponent from './hydrate';
import MapColision from './map-colision';
import changeResponsiveSettings from './responsive';

export default class GameMap {
    colision;
    colisionOrientation = '';
    visibleComponents = [];
    disabled = [];
    currentMapArr = [];
    componentsToRemove = new Set();

    constructor () {
        this.colision = new MapColision();
        this.disabled = Spell.scrolling.GameState.disabled;
        this.currentMapArr = GameMap.getAll();

        window.addEventListener('resize', changeResponsiveSettings);
        changeResponsiveSettings();
    }

    render = () => {
        this.currentMapArr = GameMap.getAll();

        if (Spell.scrolling.GameState.temp?.reinitialize) {
            this.initialize();
            Spell.scrolling.GameState.temp.reinitialize = false;
        }

        this.visibleComponents = [];
        Spell.scrolling.GameState.set('colisionCheckList', [], 'runtime');

        this.currentMapArr = this.currentMapArr
            .filter(component => !this.componentsToRemove.has(component.uuid));

        for (const component of this.currentMapArr) {
            this.processComponent(component);
        }

        this.applyMovement();
    };

    processComponent (component) {
        if (component.class.removeMeFromRenderTree) {
            this.scheduleRemoval(component);
            return;
        }
        this.visibleComponents.push(component);

        Spell.scrolling.GameComponents.renderComponent(component);
    }

    scheduleRemoval (component) {
        this.componentsToRemove.add(component.uuid);

        component.aditionalSprites?.forEach(aditionalSprite => this.componentsToRemove.add(aditionalSprite.uuid));
    }

    applyMovement () {
        const colidingComponent = this.isColiding(Spell.scrolling.GameState.runtime.movementIncrement.x, Spell.scrolling.GameState.runtime.movementIncrement.y);

        if (!colidingComponent && !colidingComponent?.class?.traversableColision) {
            this.movePlayer();
            return;
        }

        if (colidingComponent?.class?.traversableColision) {
            this.movePlayer();
        }

        this.colisionOrientation = Spell.scrolling.GameState.get('playerDirection');

        if (this.colision.element && typeof this.colision.element.class.onColision === 'function') {
            this.colision.element.class.onColision(this.colision.element);
        }
    }

    movePlayer () {
        const currentPosition = GameSession.getCurrentPosition();

        if (Spell.scrolling.GameState.runtime.movementIncrement.x !== 0) {
            currentPosition.x -= Spell.scrolling.GameState.runtime.movementIncrement.x;
            Spell.scrolling.GameState.runtime.movementIncrement.x = 0;
        }

        if (Spell.scrolling.GameState.runtime.movementIncrement.y !== 0) {
            currentPosition.y -= Spell.scrolling.GameState.runtime.movementIncrement.y;
            Spell.scrolling.GameState.runtime.movementIncrement.y = 0;
        }
    }

    pushToColisionList = ({ component, rigidBodyElement, incrementX, incrementY }) => {
        if (!rigidBodyElement || !component.class.custom) return;

        const colisionItem = {
            x: Number(component.class.sprite.position.x) - incrementX + rigidBodyElement.marginLeft,
            y: Number(component.class.sprite.position.y) - incrementY + rigidBodyElement.marginTop,
            ...rigidBodyElement,
            component
        };

        const colisionCheckList = Spell.scrolling.GameState.get('colisionCheckList') || [];
        colisionCheckList.push(colisionItem);

        Spell.scrolling.GameState.set('colisionCheckList', colisionCheckList, 'runtime');
    };

    isColiding (incrementX, incrementY) {
        for (const component of this.visibleComponents) {
            if (!component.class.rigidAreas || !Spell.scrolling.GameComponents.isCloserToUser(component.class.sprite)) {
                continue;
            }

            for (const rigidBodyElement of component.class.rigidAreas) {
                this.pushToColisionList({ component, rigidBodyElement, incrementX, incrementY });
            }
        }

        return this.colision.isColiding();
    }

    static appendData (data) {
        for (const component of data) {
            const hydrated = hydrateComponent(component);

            GameState.runtime.mapData.push(hydrated);

            if (hydrated.aditionalSprites && GameState.runtime.mapData) {
                GameState.runtime.mapData.push(...hydrated.aditionalSprites);
            }
        }
    }

    static clearAll () {
        GameState.runtime.mapData = [];
    }

    static setAll (data) {
        GameMap.clearAll();
        GameMap.appendData(data);
    }

    static getAll = () => GameState.runtime.mapData;
}
