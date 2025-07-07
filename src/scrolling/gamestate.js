export default class GameState {
    static disabled = [
        'debug.colision'
    ];

    static persistent = {
        charSpeed: 8,
        position: { x: -100, y: -100 }
    };

    static runtime = {
        currentPlayerSprite: null,
        mapData: [],
        colisionCheckList: [],
        responsiveSettings: {
            width: 0,
            height: 0
        },
        keys: {
            up: false,
            down: false,
            right: false,
            left: false,
            one: false,
            two: false,
            three: false,
            four: false,
            five: false,
            e: false
        },
        playerDirection: 'down', // up, down, left, right, leftUp, leftDown, rightUp, rightDown
        playerSpeed: 'stoped', // walking, running, stoped
        movementIncrement: { x: 0, y: 0 },
        playerScreenPosition: {
            x: 0,
            y: 0
        }
    };

    static update (state, type = 'runtime') {
        if (type === 'persistent') {
            GameState.persistent = { ...GameState.persistet, ...state };
            return GameState.persistent;
        }

        GameState.runtime = { ...GameState.runtime, ...state };
        return GameState.runtime;
    }

    static set (key, value, type = 'runtime') {
        if (type === 'persistent') {
            GameState.persistent[key] = value;
            return value;
        }
        GameState.runtime[key] = value;
        return value;
    }

    static get (key, type = 'runtime') {
        if (type === 'persistent') {
            return GameState.persistent[key] || null;
        }
        return GameState.runtime[key] || null;
    }
}
