export default class SpellTimmer{
    timmerInterval = false
    timmer = 0
    timmerCallbackList = []
    timmerCallbackIdStack = []

    timmerTick = () => {
        this.timmer+=0.5
        this.isNextHalfSecond = true;
        this.timerModCount++
        if(this.timerModCount == 2){
            this.timerModCount = 0;
            this.isNextSecond = true
        }
    }

    initializeTimmer(){
        if(this.timmerInterval === false){
            this.timerModCount = 0
            // @todo find a better way to track time across game loop with variable FPS
            this.timmerInterval = setInterval(this.timmerTick, 500);
        }
    }
}