import Spell from './spell'
import SpellMouse from './mouse'

export default class SpellGame {
    // Frame rate
    isFirstFrame = true
    frameCount = 0
    framesPersecond = 40
    frameInterval = 0
    timmerInterval = false
    totalDuration = 0

    // game
    singleLevelCallback = false
    paused = false

    // Timmer properties
    timmer = 0
    timmerCallbackList = []
    timmerCallbackIdStack = []
    isNextSecond = 0
    isNextHalfSecond = 0
    
    frameDuration = 0
    maxFrameDuration = 0
    
    startAuto = true

    constructor(framesPersecond) {
        this.framesPersecond = framesPersecond
        this.frameInterval = 1000 / this.framesPersecond
        this.startWhenLoaded()
    }

    pause = () => this.paused = true

    resume = () => this.paused = false

    renderStop = () => this.stopRendering = true;

    renderGo = () => this.stopRendering = false;

    preload = (imageList) => {
        if(typeof imageList !== 'object'){
            throw new Error('SPELL image list must be an object of images [{[key: string] : value}]');
        }
        Spell.loader.preload(imageList)
        return this
    }

    afterLoad = (callback) => {
        if(typeof callback !== 'function'){
            throw new Error('SPELL after loading callback must be a function');
        }
        Spell.loader.afterLoad(callback)
        return this
    }

    startWhenLoaded(){
        this.setUserland()
        let loaderCheck = setInterval(() => {
            if(Spell.loader.loaded){
                clearInterval(loaderCheck)
                if(this.startAuto) 
                    this.start()
            }
        }, 50);
    }

    setKeyboard = (keys) => {
        this.keys = keys
        Spell.keyboardSystem.startListemKeyboard(this.keys)
        return this
    }

    start() {
        window.requestAnimationFrame(this.gameLoop)
    }

    __waitToNextFrame(){
        return new Promise((resolve) => {
        
            let startWaiting = (new Date()).getTime()
            let wait = true
            while (wait){
                if((new Date()).getTime() - startWaiting >= (this.frameInterval - this.frameDuration)){
                    resolve(true)
                    break
                }
            }
        })
    }

    _updateStatusRegisters(){
        this.isFirstFrame = false
        this.keys ? Spell.keyboardSystem.resetKeyboard(this.keys) : false
        this.frameCount++
        SpellMouse.clicked = false
        this.isNextHalfSecond = false;
        this.isNextSecond = false;
    }

    setGameLoop(singleLevelCallback){
        if(typeof singleLevelCallback !== 'function'){
            throw new Error('Spell: game loop must be a function')
        }
        this.singleLevelCallback = singleLevelCallback
        return this
    }

    setFrameSpeed(framesPersecond){
        this.framesPersecond = framesPersecond
        this.frameInterval = 1000 / this.framesPersecond
    }

    timmerTick = () => {
        if(this.paused === false){
            this.timmer+=0.5
            this.isNextHalfSecond = true;
            this.timerModCount++
            if(this.timerModCount == 2){
                this.timerModCount = 0;
                this.isNextSecond = true
            }
        }
    }

    initializeTimmer(){
        this.timerModCount = 0
        this.timmerInterval = setInterval(this.timmerTick, 500);
    }

    setUserland = () => {
        Spell.game = this
        Spell.keyboard = Spell.keyboardSystem.keyPress,
        Spell.isFirstFrame = this.isFirstFrame
        Spell.frameCount = this.frameCount
        Spell.isNextSecond = this.isNextSecond
        Spell.isNextHalfSecond = this.isNextHalfSecond
        Spell.render =  {
            stop: this.renderStop,
            play: this.renderGo,
            setFrameRate: this.setFrameSpeed
        }
    }

    gameLoop = async () => {
        // start colecting the performance stats
        let now = (new Date()).getTime()
        this.totalDuration = now
        this.frameDuration = now

        // check frame rate skip 
        if(this.timmerInterval === false)
            this.initializeTimmer()
        if(this.stopRendering)
            return window.requestAnimationFrame(this.gameLoop)

        if(Spell.isFirstFrame) 
            Spell.canvas.show()

        // update spell userland
        this.setUserland()

        if(typeof this.singleLevelCallback === 'function'){    
            // call user Methods
            this.singleLevelCallback()
            // Render all images at the same time
            Spell.canvas.render()
        }else{
            throw new Error('Spell: game loop must be a function, please run setGameLoop')
        }

        // reset state for the next frame
        this._updateStatusRegisters()
        
        // get the render frame duration
        this.frameDuration = (new Date()).getTime() - this.frameDuration
        // start collecting the interval await duration
        let waitDuration = (new Date()).getTime()
        // wait for the next loop
        await this.__waitToNextFrame()
        // get the wait interval duration
        waitDuration = (new Date()).getTime() - waitDuration
        // get the full rendering cicle duration
        this.totalDuration = (new Date()).getTime() - this.totalDuration
        
        if(Spell.debug.get('DEBUG') && Spell.debug.get('DEBUG_PERFORMANCE')){
            console.log({
                frameDuration: this.frameDuration,
                waitDuration,
                totalDuration: this.totalDuration
            })
        }

        window.requestAnimationFrame(this.gameLoop)
    }
}