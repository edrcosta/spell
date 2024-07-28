import Spell from '.';

export default class SpellTimmer {
    timmerInterval = false;
    timmer = 0;
    halfSecCounter = 0;

    timmerTick = () => {
        this.timmer += 0.5;
        Spell.isNextHalfSecond = true;
        this.halfSecCounter++;
        if (this.halfSecCounter === 2) {
            this.halfSecCounter = 0;
            this.isNextSecond = true;
        }
    };

    initializeTimmer () {
        if (this.timmerInterval === false) {
            this.halfSecCounter = 0;
            this.timmerInterval = setInterval(this.timmerTick, 500);
        }
    }

    stop () {
        clearInterval(this.timmerInterval);
        this.timmerInterval = false;
    }
}
