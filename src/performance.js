import Spell from '.';

export default class SpellPerformance {
    frameDuration;
    framesPersecond;
    iddleTime = 0;

    constructor (fps) {
        this.framesPersecond = fps;
    }

    isEnabled = () => Spell.debug.get('DEBUG') && Spell.debug.get('DEBUG_PERFORMANCE');

    startFrame = () => {
        const now = (new Date()).getTime();
        this.frameDuration = now;
    };

    endFrame = () => {
        this.frameDuration = (new Date()).getTime() - this.frameDuration;
        this.iddleTime = (new Date()).getTime();
    };

    getReport = () => {
        this.iddleTime = (new Date()).getTime() - this.iddleTime;

        if (this.isEnabled()) {
            console.log({
                framesPerSecond: this.framesPersecond,
                idealFrameDuration: Number(1000 / this.framesPersecond),
                frameDuration: this.frameDuration,
                idle: this.iddleTime,
                renderedFrameDuration: this.frameDuration + this.iddleTime
            });
        }
    };

    perfomance = () => ({
        totalJSHeapSize: Spell.math.byteToMb(window.performance.memory.totalJSHeapSize),
        usedJSHeapSize: Spell.math.byteToMb(window.performance.memory.usedJSHeapSize),
        jsHeapSizeLimit: Spell.math.byteToMb(window.performance.memory.jsHeapSizeLimit)
    });
}
