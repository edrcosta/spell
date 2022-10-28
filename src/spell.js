import SpellCanvas from './canvas'
import SpellAudio from './audio'
import SpellKeyboard from './keyboard'
import SpellMath from './math'
import SpellFirebase from './firebase'
import Debugger from './game-debugger'
import SpellMouse from './mouse'

// This class is used to expose diferent spell tools
export default class Spell{
    // Classes
    static debug = Debugger
    static math = SpellMath
    static mouse = SpellMouse
    static audio = SpellAudio
    static keyboardSystem = SpellKeyboard
    // propertys updated in loop
    static keyboard
    static game
    static canvas
    static isFirstFrame
    static frameCount
    static websocket = false
    static colision
    static isNextSecond
    static isNextHalfSecond
    static firebase
    static render
    static initialize(gameCanvasId){
        Spell.canvas = new SpellCanvas(gameCanvasId, this.debugger)
        Spell.firebase = new SpellFirebase()
    }
}
