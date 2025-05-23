import SpellAudio from './audio';
import SpellKeyboard from './keyboard';
import SpellMath from './math';
import SpellDebugger from './game-debugger';
import SpellMouse from './mouse';
import SpellLoader from './asset-loader';
import SpellColision from './colision';
import SpellLevels from './levels';
import SpellRendering from './rendering';
import SpellWindow from './window';
import SpellGame from './game';
import SpellAnimation from './animation';
import SpellCartesian from './cartesian';
import SpellTimmer from './timmer';

import SpellScrolling from './scrolling';

export default class Spell {
    static isFirstFrame = true;
    static isNextSecond = false;
    static isNextHalfSecond = false;
    static frameCount = 0;
    static keyboard = {};
    static initialized = false;

    static keyboardSystem = SpellKeyboard.prototype;
    static window = SpellWindow.prototype;
    static canvas = SpellRendering.prototype;
    static math = SpellMath.prototype;
    static loader = SpellLoader.prototype;
    static colision = SpellColision.prototype;
    static debug = SpellDebugger.prototype;
    static audio = SpellAudio.prototype;
    static levels = SpellLevels.prototype;
    static mouse = SpellMouse.prototype;
    static animation = SpellAnimation.prototype;
    static game = SpellGame.prototype;
    static cartesian = SpellCartesian.prototype;
    static timmer = SpellTimmer;

    // 2d scrolling helpers
    static scrolling = SpellScrolling;

    static initialize ({ gameCanvasId, fps, engine = 'canvas' }) {
        Spell.keyboardSystem = new SpellKeyboard();
        Spell.math = new SpellMath();
        Spell.cartesian = new SpellCartesian();
        Spell.loader = new SpellLoader();
        Spell.colision = new SpellColision();
        Spell.debug = new SpellDebugger();
        Spell.audio = new SpellAudio();
        Spell.mouse = new SpellMouse();
        Spell.animation = new SpellAnimation();
        Spell.window = new SpellWindow({ gameCanvasId });
        Spell.canvas = new SpellRendering({ gameCanvasId, engine });
        Spell.levels = new SpellLevels();
        Spell.game = new SpellGame(fps);
        Spell.timmer = SpellTimmer;

        // initialize scrolling
        Spell.scrolling = SpellScrolling;

        Spell.scrolling.ComponentList = new Spell.scrolling.ComponentList({});
        return Spell.game;
    }
}
