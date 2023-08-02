import SpellAudio from './audio'
import SpellKeyboard from './keyboard'
import SpellMath from './math'
import SpellFirebase from './firebase'
import SpellDebugger from './game-debugger'
import SpellMouse from './mouse'
import SpellMap from './map-system'
import SpellLoader from './asset-loader'
import SpellColision from './colision'
import SpellLevels from './levels'
import SpellRendering from './rendering'
import SpellWindow from './window'
import SpellGame from './game'
import SpellAnimation from './animation'

export default class Spell{
    static isFirstFrame = true
    static frameCount = 0
    static isNextSecond = false
    static isNextHalfSecond = false
    static keyboard = {}

    static initialize(gameCanvasId, fps){
        Spell.keyboardSystem = new SpellKeyboard()
        Spell.window = new SpellWindow(gameCanvasId)
        Spell.canvas = new SpellRendering(gameCanvasId)
        Spell.math = new SpellMath()
        Spell.loader = new SpellLoader()
        Spell.firebase = new SpellFirebase()        
        Spell.colision = new SpellColision()
        Spell.map = new SpellMap()
        Spell.debug = new SpellDebugger()
        Spell.audio = new SpellAudio()
        Spell.levels = new SpellLevels()
        Spell.mouse = new SpellMouse()
        Spell.animation = new SpellAnimation()
        Spell.game = new SpellGame(fps)
        return Spell.game
    }
}
