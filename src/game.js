import SpellCanvas from './canvas'
import SpellAudio from './audio'
import SpellColission from './colission'
import SpellKeyboard from './keyboard'
import SpellLoader from './sprite-loader'
import SpellMath from './math'
import SpellMouse from './mouse'
import SpellWebSocket from './websocket'
import Debugger from './game-debugger'
import { DEBUG_PERFORMANCE, DEBUG } from './game-debugger'

export default class SpellGame {
    canvas
    keyboard
    math
    websocket = false
    colision
    isFirstFrame = true
    frameCount = 0
    framesPersecond = 40
    frameInterval = 0
    lastGameLoopTimeStamp = false
    coordSystem = 'web'
    singleLevelCallback = false
    timmerInterval = false
    timmer = 0
    paused = false
    currentCallObject = {
        time: 0,
        callback: null,
        stop: 0,
        startedAt: false
    }
    timmerCallbackList = []
    timmerCallbackIdStack = []
    patternGenerator
    isNextSecond = 0
    isNextHalfSecond = 0

    constructor(gameCanvasId, framesPersecond) {
        this.gameCanvasId = gameCanvasId
        this.framesPersecond = framesPersecond
        this.frameInterval = 1000 / this.framesPersecond
        this.canvas = new SpellCanvas(this.gameCanvasId, this.debugger)
        this.keyboard = new SpellKeyboard()
        this.loader = new SpellLoader(this.getUserHelperSpace())
        this.colision = new SpellColission(this.canvas)
        this.startWhenLoaded()
    }

    pause = () => this.paused = true
    unpause = () => this.paused = false

    preload = (imageList) => {
        if(typeof imageList !== 'object'){
            throw new Error('SPELL image list must be an object of images');
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
        this.keyboard.startListemKeyboard(this.keys)
        return this
    }

    start() {
        window.requestAnimationFrame(this.gameLoop)
    }

    _frameRateCheck(){
        if (!this.lastGameLoopTimeStamp) this.lastGameLoopTimeStamp = new Date()

        const now = new Date()

        if (now.getTime() - this.lastGameLoopTimeStamp.getTime() > this.frameInterval) {
            this.lastGameLoopTimeStamp = new Date()
            return true
        }
        return false
    }

    _updateStatusRegisters(){
        this.isFirstFrame = false
        this.keys ? this.keyboard.resetKeyboard(this.keys) : false
        this.frameCount++
    }

    setGameLoop(singleLevelCallback){
        this.singleLevelCallback = singleLevelCallback
        return this
    }

    renderStop = () => this.stopRendering = true;

    renderGo = () => this.stopRendering = false;

    setFrameSpeed(framesPersecond){
        this.framesPersecond = framesPersecond
        this.frameInterval = 1000 / this.framesPersecond
    }

    enableWebSocket = (url, protocols) => {
        this.websocket = new SpellWebSocket()
        this.websocket.initialize(url, protocols)
        return this
    }

    initializeTimmer(){
        this.timerModCount = 0
        this.timmerInterval = setInterval(() => {
            if(this.paused === false)
                this.timmer+=0.5
                this.isNextHalfSecond = true;
                this.timerModCount++
                if(this.timerModCount == 2){
                    this.timerModCount = 0;
                    this.isNextSecond = true
                }
        }, 500);
    }

    getUserHelperSpace = () => {
        return {
            debug: Debugger,
            math: SpellMath,
            mouse: SpellMouse,
            audio: SpellAudio,
            game: this,
            canvas: this.canvas, 
            keyboard: this.keyboard.keyPress, 
            isFirstFrame: this.isFirstFrame,
            frameCount: this.frameCount,
            patterns: this.patternGenerator,
            websocket: this.websocket,
            colision: this.colision,
            isNextSecond: this.isNextSecond,
            isNextHalfSecond: this.isNextHalfSecond,
            render:{
                stop: this.renderStop,
                play: this.renderGo,
                setFrameRate: this.setFrameSpeed
            }
        }
    }

    gameLoop = () => {
        // check frame rate skip 
        if(this.timmerInterval === false)
            this.initializeTimmer()
        if (!this._frameRateCheck())
            return window.requestAnimationFrame(this.gameLoop) // to next loop
        if(this.stopRendering)
            return window.requestAnimationFrame(this.gameLoop) // to next loop

        // create new spell userland 
        const spellUserInstance = this.getUserHelperSpace()
        
        // skip if need
        if(spellUserInstance.canvas.rendering) return false

        // display: none of the element
        if(spellUserInstance.isFirstFrame)
            spellUserInstance.canvas.show()     
        
        // colect performance
        let start = window.performance.now();
        let end;
        if(typeof this.singleLevelCallback === 'function'){    
            // render 
            this.singleLevelCallback(spellUserInstance)
            // colect performance
            end = window.performance.now();
        }
        
        // debug
        const userTime = end - start
        if(DEBUG && DEBUG_PERFORMANCE){
            console.log('SPELL:', userTime, 'ms per frame of a max', this.frameInterval, 'ms at', this.framesPersecond, 'FPS')
            if(this.frameInterval < userTime){
                console.log('SPELL: cant reach framerate')
            }
        }
        
        // reset state for the next frame
        SpellMouse.clicked = false
        this._updateStatusRegisters()
        window.requestAnimationFrame(this.gameLoop) // to next loop
        this.isNextHalfSecond = false;
        this.isNextSecond = false;
    }
}