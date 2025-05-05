import HydrateComponents from './hydrate';
import GameState from './gamestate';
import ComponentList from './component-list';
import CustomComponentItem from './components/custom-component-item';
import RigidComponentItem from './components/rigid-component-item';
import StaticComponentItem from './components/static-component-item';
import GameComponents from './component';
import GameMap from './map';
import changeResponsiveSettings from './responsive';
import Player from './player';

const SpellScrolling = {
    HydrateComponents,
    GameState,
    ComponentList,
    GameComponents,
    GameMap,
    Player,
    ComponentTypes: {
        CustomComponentItem,
        RigidComponentItem,
        StaticComponentItem
    },
    changeResponsiveSettings
};

export default SpellScrolling;
