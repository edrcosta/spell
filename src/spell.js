import SpellCanvas from './canvas'
import SpellAudio from './audio'
import SpellKeyboard from './keyboard'
import SpellMath from './math'
import SpellFirebase from './firebase'
import SpellDebugger from './game-debugger'
import SpellMouse from './mouse'
import SpellMap from './map-system'
import SpellColision from './colision'

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
    static websocket = false
    static isNextSecond
    static isNextHalfSecond
    static firebase
    static render

    static initialize(gameCanvasId){
        Spell.canvas = new SpellCanvas(gameCanvasId, this.debugger)
        Spell.firebase = new SpellFirebase()        
        Spell.colision = new SpellColision()
        Spell.map = new SpellMap()
        Spell.debug = new SpellDebugger()
        Spell.audio = new SpellAudio()
    }
}
