import Spell from '.';
import SpellMouse from './mouse';
import SpellPerformance from './performance';
import SpellTimmer from './timmer';

export default class SpellGame {
    frameCount = 0;
    framesPersecond = 40;
    frameInterval = 0;
    userGameCallback = false;
    performance;
    keys = [];

    constructor (framesPersecond) {
        this.framesPersecond = parseInt(framesPersecond);
        this.frameInterval = 1000 / this.framesPersecond;
        this.performance = new SpellPerformance();
        this.timmer = new SpellTimmer();
        Spell.initialized = true;
    }

    start = this.runLoopAgain;

    runLoopAgain () {
        // call a loop without blocking the main thread
        window.requestAnimationFrame(this.gameLoop);
    }

    gameLoop = async () => {
        this.performance.startFrame();

        if (this.timmer.timmerInterval === false) { this.timmer.initializeTimmer(); };
        if (this.stopRendering) { return this.runLoopAgain(); };
        if (Spell.isFirstFrame) { Spell.canvas.show(); };

        this.initializeFrame();
        this.executeUserCode();
        this.resetFrame();

        this.performance.endFrame();
        await this.waitToNextFrame();
        this.performance.getReport();

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

    waitToNextFrame = () => new Promise((resolve) => {
        const startWaiting = (new Date()).getTime();
        while (true) {
            if ((new Date()).getTime() - startWaiting >= (this.frameInterval - this.performance.frameDuration)) {
                resolve(true);
                break;
            }
        }
    });

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
        Spell.frameCount = this.frameCount;
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
        this.frameCount++;
        SpellMouse.clicked = false;
        Spell.isFirstFrame = false;
        Spell.isNextHalfSecond = false;
        Spell.isNextSecond = false;
    }
}
