import Spell from './spell'
import SpellMouse from './mouse'
import SpellPerformance from './performance'
import SpellTimmer from './timmer'

export default class SpellGame {
    frameCount = 0
    framesPersecond = 40
    frameInterval = 0
    singleLevelCallback = false
    startAuto = true
    performance

    constructor(framesPersecond) {
        this.framesPersecond = parseInt(framesPersecond)
        this.frameInterval = 1000 / this.framesPersecond
        this.performance = new SpellPerformance()
        this.timmer = new SpellTimmer()
    }
    
    gameLoop = async () => {
        this.performance.startFrame()

        if(this.timmer.timmerInterval === false)
            this.timmer.initializeTimmer()

        if(this.stopRendering)
            return window.requestAnimationFrame(this.gameLoop)

        if(Spell.isFirstFrame) 
            Spell.canvas.show()

        this.initializeFrame()

        if(typeof this.singleLevelCallback === 'function'){    
            this.singleLevelCallback()
            Spell.canvas.render()
        }else{
            throw new Error('Spell: game loop must be a function, please run setGameLoop')
        }

        this.resetFrame()
        
        this.performance.endFrame()

        await this.waitToNextFrame()

        this.performance.getReport()

        window.requestAnimationFrame(this.gameLoop)
    }

    waitToNextFrame = () => new Promise((resolve) => {
        let startWaiting = (new Date()).getTime()
        let wait = true
        while (wait){
            if((new Date()).getTime() - startWaiting >= (this.frameInterval - this.performance.frameDuration)){
                resolve(true)
                break
            }
        }
    })
    
    start() {
        window.requestAnimationFrame(this.gameLoop)
    }

    setGameLoop(singleLevelCallback){
        if(typeof singleLevelCallback !== 'function'){
            throw new Error('Spell: game loop must be a function')
        }
        this.singleLevelCallback = singleLevelCallback
    }

    initializeFrame = () => {
        Spell.game = this
        Spell.keyboard = Spell.keyboardSystem.keyPress,
        Spell.isFirstFrame = this.isFirstFrame
        Spell.frameCount = this.frameCount
        Spell.render =  {
            stop: this.renderStop,
            play: this.renderGo,
            setFrameRate: this.setFrameSpeed
        }
    }

    resetFrame(){
        this.keys ? Spell.keyboardSystem.resetKeyboard(this.keys) : false
        this.frameCount++
        SpellMouse.clicked = false
        Spell.isFirstFrame = false
        Spell.isNextHalfSecond = false;
        Spell.isNextSecond = false;
    }
}