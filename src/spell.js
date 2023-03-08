import SpellCanvas from './canvas'
import SpellAudio from './audio'
import SpellKeyboard from './keyboard'
import SpellMath from './math'
import SpellFirebase from './firebase'
import SpellDebugger from './game-debugger'
import SpellMouse from './mouse'
import SpellMap from './map-system'
import SpellLoader from './sprite-loader'
import SpellColision from './colision'
import SpellLevels from './levels'

/**
 * this class is the entry point to access any spell feature while the game loop its running 
 * the engine components are static properties, this mantain a global game state in a single point 
 * and allow each individual class to operate in a object oriented way
 */
export default class Spell{
    static math = SpellMath
    static mouse = SpellMouse
    static keyboardSystem = SpellKeyboard
    
    static audio
    static debug
    static map
    static colision
    static keyboard
    static game
    static canvas
    static isFirstFrame
    static frameCount
    static isNextSecond
    static isNextHalfSecond
    static firebase
    static render
    static loader   
    static levels

    static initialize(gameCanvasId){
        Spell.canvas = new SpellCanvas(gameCanvasId, this.debugger)
        Spell.firebase = new SpellFirebase()        
        Spell.colision = new SpellColision()
        Spell.map = new SpellMap()
        Spell.debug = new SpellDebugger()
        Spell.audio = new SpellAudio()
        Spell.loader = new SpellLoader()
        Spell.levels = new SpellLevels()
    }
}
