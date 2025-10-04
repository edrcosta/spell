import GameState from '../gamestate';
import DirectionalPlayer from './directional-player';
import SpaceShipPlayer from './space-ship';

export default class Player {
    rigidAreas = [];

    constructor (type = '8-directional') {
        if (type === '8-directional') {
            this.handler = new DirectionalPlayer();
        } else if (type === 'space-ship') {
            this.handler = new SpaceShipPlayer();
        }

        GameState.set('player', this, 'runtime');
    }

    render = (...args) => this.handler.render(...args);
    renderPlayer = (...args) => this.handler.renderPlayer(...args);
    debugPosition = (...args) => this.handler.debugPosition(...args);
    getCenter = (...args) => this.handler.getCenter(...args);
    stopAfterMove = (...args) => this.handler.stopAfterMove(...args);
    addAnimations = (...args) => this.handler.addAnimations(...args);
    addRigidAreas (areas) {
        this.rigidAreas = areas;
    }
}
