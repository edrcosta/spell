import Spell from '../index';

let componentCount = 0;

export default function hydrateComponent (component) {
    try {
        if (component.class && component.class.sprite) {
            return component;
        }

        if (component.length < 3) {
            throw new Error(`Spell: Hydrate failed, Invalid Component: ${JSON.stringify(component)}`);
        }

        if (isNaN(component[1]) || isNaN(component[2])) {
            throw new Error(`Spell: Hydrate failed, Coords must be integer!! {x: ${component[1]}, y: ${component[2]}}`);
        }

        const newComponent = {
            uuid: `id-${componentCount++}`,
            id: component[0],
            position: {
                x: Number(component[1] + Spell.window.horizontal(50)),
                y: Number(component[2] + Spell.window.vertical(50))
            },
            initialPosition: {
                x: Number(component[1]),
                y: Number(component[2])
            },
            data: component[3]
        };

        const componentList = Spell.scrolling.ComponentList.getList();

        if (!componentList[newComponent.id]) {
            throw new Error(`Spell: Hydrate failed, Component not found: ${JSON.stringify(component)}`);
        }

        const componentInstance = new componentList[newComponent.id]();

        if (typeof componentInstance.preInitialize === 'function') {
            componentInstance.preInitialize(newComponent.position, newComponent.data);
        }

        if (typeof componentInstance.initialize === 'function') {
            componentInstance.initialize(newComponent.position, newComponent.data, newComponent.initialPosition);
        }

        const aditionalSprites = componentInstance.aditionalSprites
            ? componentInstance.aditionalSprites.map(
                aditionalSprite => hydrateComponent(aditionalSprite)
            )
            : [];

        return {
            ...newComponent,
            aditionalSprites,
            class: componentInstance
        };
    } catch (error) {
        console.log('Spell: Hydrate failed invalid component', component);
        throw error;
    }
};
