import Spell from '..';
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
        Spell.scrolling.GameState.runtime.colisionCheckList = [];

        for (const component of this.currentMapArr) {
            this.processComponent(component);
        }

        this.currentMapArr = this.currentMapArr
            .filter(component => !this.componentsToRemove.has(component.uuid));

        this.applyMovement();
    };

    processComponent (component) {
        if (component.class.mapControllerRemoveElement) {
            this.removeFromRenderList(component);
            return;
        }

        this.visibleComponents.push(component);

        Spell.scrolling.GameComponents.renderComponent(component);
    }

    removeFromRenderList (component) {
        this.componentsToRemove.add(component.uuid);

        component.aditionalSprites?.forEach(aditionalSprite => this.componentsToRemove.add(aditionalSprite.uuid));
    }

    applyMovement () {
        if (!this.isColiding(Spell.scrolling.GameState.runtime.movementIncrement.x, Spell.scrolling.GameState.runtime.movementIncrement.y)) {
            this.movePlayer();
        } else {
            this.colisionOrientation = Spell.scrolling.GameState.get('playerDirection');

            if (this.colision.element && typeof this.colision.element.class.onColide === 'function') {
                this.colision.element.class.onColide();
            }
        }
    }

    movePlayer () {
        if (Spell.scrolling.GameState.runtime.movementIncrement.x !== 0) {
            Spell.scrolling.GameState.persistent.position.x -= Spell.scrolling.GameState.runtime.movementIncrement.x;
            Spell.scrolling.GameState.runtime.movementIncrement.x = 0;
        }

        if (Spell.scrolling.GameState.runtime.movementIncrement.y !== 0) {
            Spell.scrolling.GameState.persistent.position.y -= Spell.scrolling.GameState.runtime.movementIncrement.y;
            Spell.scrolling.GameState.runtime.movementIncrement.y = 0;
        }
    }

    pushToColisionList = ({ component, rigidBodyElement, incrementX, incrementY }) => {
        if (!rigidBodyElement) return;

        const colisionItem = {
            x: Number(component.class.sprite.position.x) - incrementX + rigidBodyElement.marginLeft,
            y: Number(component.class.sprite.position.y) - incrementY + rigidBodyElement.marginTop,
            ...rigidBodyElement,
            component
        };

        Spell.scrolling.GameState.runtime.colisionCheckList.push(colisionItem);
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
