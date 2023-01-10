import Spell from './spell'
import SpellLoader from './sprite-loader'
import SpellMouse from './mouse'
import { DEBUG_PERFORMANCE, DEBUG } from './game-debugger'

export default class SpellGame {
    // Frame rate
    isFirstFrame = true
    frameCount = 0
    framesPersecond = 40
    frameInterval = 0
    timmerInterval = false

    // game
    singleLevelCallback = false
    paused = false

    // Timmer properties
    timmer = 0
    timmerCallbackList = []
    timmerCallbackIdStack = []
    isNextSecond = 0
    isNextHalfSecond = 0

    constructor(gameCanvasId, framesPersecond) {
        this.framesPersecond = framesPersecond
        this.frameInterval = 1000 / this.framesPersecond
        this.loader = new SpellLoader(this.setUserland())
        this.startWhenLoaded()
        Spell.initialize(gameCanvasId)
    }

    pause = () => this.paused = true

    resume = () => this.paused = false

    renderStop = () => this.stopRendering = true;

    renderGo = () => this.stopRendering = false;

    preload = (imageList) => {
        if(typeof imageList !== 'object'){
            throw new Error('SPELL image list must be an object of images [{[key: string] : value}]');
        }
        this.loader.preload(imageList)
        return this
    }

    afterLoad = (callback) => {
        if(typeof callback !== 'function'){
            throw new Error('SPELL after loading callback must be a function');
        }
        this.loader.afterLoad(callback)
        return this
    }

    startWhenLoaded(){
        let loaderCheck = setInterval(() => {
            if(this.loader.loaded){
                clearInterval(loaderCheck)
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

    _frameRateCheck(){
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            }, this.frameInterval);
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
        
        await this._frameRateCheck()
        // check frame rate skip 
        if(this.timmerInterval === false)
            this.initializeTimmer()
        if(this.stopRendering)
            return window.requestAnimationFrame(this.gameLoop) // to next loop

        if(Spell.isFirstFrame) 
            Spell.canvas.show()     

        // colect performance
        let start = window.performance.now();
        let end;

        // update spell userland
        this.setUserland()

        if(typeof this.singleLevelCallback === 'function'){    
            // call user Methods
            this.singleLevelCallback()
            // Render all images at the same time
            Spell.canvas.__renderStack()
            // colect performance
            end = window.performance.now(); 
        }else{
            throw new Error('Spell: game loop must be a function, please run setGameLoop')
        }

        // reset state for the next frame
        this._updateStatusRegisters()

        // debug
        const userTime = end - start
        if(DEBUG && DEBUG_PERFORMANCE){
            console.log('SPELL:', userTime, 'ms per frame of a max', this.frameInterval, 'ms at', this.framesPersecond, 'FPS')
            if(this.frameInterval < userTime){
                console.log('SPELL: cant reach framerate')
            }
        }
        
        // to next loop
        window.requestAnimationFrame(this.gameLoop)
    }
}