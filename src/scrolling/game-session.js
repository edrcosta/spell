import GameState from './gamestate';

export class GameSession {
    static getCurrentPosition () {
        return GameState.persistent.position;
    }
}
