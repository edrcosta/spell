import Spell from '.';
import SpellMouse from './mouse';
import SpellTimmer from './timmer';

export default class SpellGame {
    // fps control
    desiredFPS = 40;
    frameInterval = 0;
    frameDuration = 0;

    // game loop
    userGameCallback = false;
    halt = false;
    keys = [];

    constructor (desiredFPS) {
        this.desiredFPS = parseInt(desiredFPS);
        this.frameInterval = 1000 / this.desiredFPS;
        this.timmer = new SpellTimmer();

        Spell.initialized = true;
    }

    start = this.runLoopAgain;

    runLoopAgain () {
        window.requestAnimationFrame(this.gameLoop);
    }

    gameLoop = async () => {
        const loopstart = performance.now();

        if (Spell.isFirstFrame) Spell.canvas.show();

        if (this.timmer.timmerInterval === false) {
            this.timmer.initializeTimmer();
        };

        if (this.halt) {
            return this.runLoopAgain();
        };

        const start = performance.now();

        this.initializeFrame();
        this.executeUserCode();
        this.resetFrame();

        this.frameDuration = performance.now() - start;
        this.iddleTime = Math.max(0, this.frameInterval - this.frameDuration);
        this.renderingTime = +(this.frameDuration + this.iddleTime).toFixed(4);

        await this.waitToNextFrame(this.iddleTime);

        this.fullLoopTime = performance.now() - loopstart;
        this.currentFPS = (1000 / this.fullLoopTime).toFixed(2);

        Spell.debug.get('DEBUG_PERFORMANCE') && console.table({
            setupFPS: this.desiredFPS,
            FPS: this.currentFPS,
            frameDuration: +this.frameDuration.toFixed(4),
            idleTime: +this.iddleTime.toFixed(4),
            renderingTime: this.renderingTime,
            fullLoopTime: this.fullLoopTime,
            engineDrift: this.fullLoopTime - this.renderingTime,
            isFPSOK: this.fullLoopTime <= this.currentFPS,
            memory: Spell.math.byteToMb(Math.max(window.performance.memory.totalJSHeapSize, window.performance.memory.usedJSHeapSize))
        });

        this.runLoopAgain();
    };

    executeUserCode () {
        if (typeof this.userGameCallback === 'function') {
            this.userGameCallback();
            Spell.canvas.render();
        } else {
            throw new Error('Spell: game loop must be a function, please run setGameLoop or use a level class');
        }
    }

    waitToNextFrame = (waitFor) => {
        if (waitFor <= 0) return;
        const start = performance.now();

        return new Promise((resolve) => {
            // for some reason setTimeout takes a lot even do while loop block the main thread it takes less time.
            while (performance.now() - start <= waitFor) {
                // do nothing
            }
            resolve();
        });
    };

    setGameLoop (userGameCallback) {
        if (typeof userGameCallback !== 'function') {
            throw new Error('Spell: game loop must be a function');
        }
        this.userGameCallback = userGameCallback;
    }

    initializeFrame = () => {
        Spell.game = this;
        Spell.keyboard = Spell.keyboardSystem.keyPress;
        Spell.isFirstFrame = this.isFirstFrame;
        Spell.render = {
            stop: this.renderStop,
            play: this.renderGo,
            setFrameRate: this.setFrameSpeed
        };
    };

    resetFrame () {
        if (this.keys) {
            Spell.keyboardSystem.resetKeyboard(this.keys);
        }
        SpellMouse.clicked = false;
        Spell.isFirstFrame = false;
        Spell.isNextHalfSecond = false;
        Spell.isNextSecond = false;
    }
}
