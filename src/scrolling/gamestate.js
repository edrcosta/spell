export default class GameState {
    static disabled = [
        'debug.colision'
    ];

    static persistent = {
        charSpeed: 8,
        position: { x: 0, y: 0 },
        inventory: []
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
            left: false
        },
        movementIncrement: { x: 0, y: 0 },
        playerScreenPosition: {
            x: 0,
            y: 0
        },
        // 8 direction player
        playerDirection: 'down', // up, down, left, right, leftUp, leftDown, rightUp, rightDown
        playerSpeed: 'stoped', // walking, running, stoped
        // space ship player
        rotation: 0
    };

    static update (state, type = 'runtime') {
        if (type === 'persistent') {
            GameState.persistent = {
                ...GameState.persistent,
                ...state
            };
            return GameState.persistent;
        }

        GameState.runtime = {
            ...GameState.runtime,
            ...state
        };
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

    static increment (key, value, type = 'runtime') {
        if (type === 'persistent') {
            GameState.persistent[key] += value;
            return;
        }
        GameState.runtime[key] += value;
    }

    static push (key, value, type = 'runtime') {
        if (!GameState.persistent[key]) {
            GameState.persistent[key] = [];
        }

        if (type === 'persistent') {
            GameState.persistent[key].push(value);
            return;
        }
        GameState.runtime[key].push(value);
    }
}
