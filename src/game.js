import SpellCanvas from './canvas'
import SpellAudio from './audio'
import SpellColission from './colission'
import SpellKeyboard from './keyboard'
import SpellLoader from './sprite-loader'
import SpellMath from './math'
import SpellMouse from './mouse'
import SpellPatterns from './pattern-generator'
import SpellSprite from './sprite'
import SpellWebSocket from './websocket'
import { DEBUG_PERFORMANCE, DEBUG, DEBUG_SPRITE_LOADING } from './game-debugger'

/**
 * This class handdle the game loop 
 * 
 * - Game loop frame rate control
 * - game timmer 
 * - multi level system 
 * - render sprites 
 */
export default class SpellGame {
    // Libraries 
    canvas
    keyboard
    math
    websocket = false
    colision

    isFirstFrame = true
    frameCount = 0
    // Clock control variabless
    framesPersecond = 40
    frameInterval = 0
    lastGameLoopTimeStamp = false

    coordSystem = 'web' // @todo fix the cartesian system
    singleLevelCallback = false

    timmerInterval = false
    timmer = 0

    paused = false

    // for timmer callbacks 
    currentCallObject = {
        time: 0,
        callback: null,
        stop: 0,
        startedAt: false
    }
    
    timmerCallbackList = []
    timmerCallbackIdStack = []
    patternGenerator

    constructor(gameCanvasId, framesPersecond) {
        this.gameCanvasId = gameCanvasId
        this.framesPersecond = framesPersecond
        this.frameInterval = 1000 / this.framesPersecond
        this.canvas = new SpellCanvas(this.gameCanvasId, this.debugger)
        this.keyboard = new SpellKeyboard()
        this.loader = new SpellLoader(this.getUserHelperSpace())
        this.patternGenerator = new SpellPatterns()
        this.colision = new SpellColission(this.canvas)
        SpellMouse.initialize(this.gameCanvasId)
        this.startWhenLoaded()
    }

    /**
     * Setup the preloading list of images 
     * @param {image list} imageList 
     * @returns 
     */
    preload = (imageList) => {
        this.loader.preload(imageList)
        return this
    }

    /**
     * setup the after load callback 
     * @param {function} callback 
     * @returns 
     */
    afterLoad = (callback) => {
        this.loader.afterLoad(callback)
        return this
    }

    /**
     * Simply start the game after preloading
     */
    startWhenLoaded(){
        let loaderCheck = setInterval(() => {
            if(this.loader.loaded){
                clearInterval(loaderCheck)
                this.start()
            }
        }, 50);
    }

    /**
     * define game keys to be captured and send to frame method
     * 
     * @param {Array<string>} keys 
     */
     setKeyboard = (keys) => {
        this.keys = keys
        this.keyboard.startListemKeyboard(this.keys)
        return this
     }

    /**
     * Start the game rendering
     */
    start() {
        window.requestAnimationFrame(this.gameLoop)
    }

    /**
     * Keep requestAnimationFrame into the frame rate defined by the Game developer
     * 
     * @note canvas dont has a frame rate system build in 
     */    
    _frameRateCheck(){
        if (!this.lastGameLoopTimeStamp) this.lastGameLoopTimeStamp = new Date()

        const now = new Date()

        if (now.getTime() - this.lastGameLoopTimeStamp.getTime() > this.frameInterval) {
            this.lastGameLoopTimeStamp = new Date()
            return true
        }
        return false
    }


    /**
     * Update game frame information status
     */
    _updateStatusRegisters(){
        this.isFirstFrame = false
        this.keys ? this.keyboard.resetKeyboard(this.keys) : false
        this.frameCount++
    }

    /**
     * Allow to just use an callback  instead of a level class
     * 
     * @param {*} singleLevelCallback 
     * @returns 
     */
    setGameLoop(singleLevelCallback){
        this.singleLevelCallback = singleLevelCallback
        return this
    }

    /**
     * Create websocket client instance and try to connect
     * @param {string} url 
     * @param {string} protocols 
     */
    enableWebSocket = (url, protocols) => {
        this.websocket = new SpellWebSocket()
        this.websocket.initialize(url, protocols)
        return this
    }

    /**
     * play game execution
     * @returns bool
     */
    pause = () => this.paused = true

    /**
     * Stop the game execution
     * @returns bool
     */
    unpause = () => this.paused = false

    /**
     * Start a 1 second interval that increment a counter if the game is not paused
     */
    initializeTimmer(){
        this.timmerInterval = setInterval(() => {
            if(this.paused === false)
                this.timmer+=0.5
        }, 500);
    }

    /**
     * inject the current instance of each spell tool into the user  function
     * 
     * @returns spell
     */
    getUserHelperSpace = () => {
        return {
            canvas: this.canvas, 
            keyboard: this.keyboard.keyPress, 
            math: SpellMath,
            isFirstFrame: this.isFirstFrame,
            frameCount: this.frameCount,
            game: this,
            mouse: SpellMouse,
            audio: SpellAudio,
            patterns: this.patternGenerator,
            websocket: this.websocket,
            colision: this.colision
        }
    }

    /**
     * Game loop method 
     * 
     * !called in the frameRate specify by the user 
     * 
     * @note using requestAnimationFrame instead of setInterval, not block the event loop 
     */
    gameLoop = () => {
        // check frame rate skip 
        if(this.timmerInterval === false)
            this.initializeTimmer()
        if (!this._frameRateCheck())
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
            console.log('Frame render time:', userTime)
        }
        
        // reset state for the next frame
        SpellMouse.clicked = false
        this._updateStatusRegisters()
        window.requestAnimationFrame(this.gameLoop) // to next loop
    }
}