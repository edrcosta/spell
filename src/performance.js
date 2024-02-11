import Spell from '.';

export default class SpellPerformance {
    totalDuration;
    frameDuration;
    waitDuration;

    isEnabled = () => Spell.debug.get('DEBUG') && Spell.debug.get('DEBUG_PERFORMANCE');

    startFrame = () => {
        const now = (new Date()).getTime();
        this.totalDuration = now;
        this.frameDuration = now;
    };

    endFrame = () => {
        this.frameDuration = (new Date()).getTime() - this.frameDuration;
        this.waitDuration = (new Date()).getTime();
    };

    getReport = () => {
        this.waitDuration = (new Date()).getTime() - this.waitDuration;
        this.totalDuration = (new Date()).getTime() - this.totalDuration;

        if (this.isEnabled()) {
            console.log({
                frameDuration: this.frameDuration,
                waitDuration: this.waitDuration,
                totalDuration: this.totalDuration
            });
        }
    };

    perfomance = () => ({
        totalJSHeapSize: Spell.math.byteToMb(window.performance.memory.totalJSHeapSize),
        usedJSHeapSize: Spell.math.byteToMb(window.performance.memory.usedJSHeapSize),
        jsHeapSizeLimit: Spell.math.byteToMb(window.performance.memory.jsHeapSizeLimit)
    });
}
