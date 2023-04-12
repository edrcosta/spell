import SpellSprite from "./sprite"

let animations = {}
export default class SpellAnimation {
    create(id, { frames, interval }){
        frames.forEach(frameItem => {
            if(!frameItem instanceof SpellSprite){
                throw new Error('SPELL: Frames must be an array of sprites')
            }
        })

        animations[id] = { 
            frames,
            interval,
            currentFrame: 0,
            intervalCount: 0
        }
    }
    
    getCurrentFrame(id){
        if(typeof animations[id] === 'object'){
            const animationGroup = animations[id]
            // get current frame 
            const current = animationGroup.frames[animationGroup.currentFrame]

            // check if need to increment animation frame
            if(animationGroup.intervalCount === animationGroup.interval){
                // reset interval to only increment animation after some number of frames rendered
                animationGroup.intervalCount = 0
                // increment animation
                animationGroup.currentFrame++
                if(animationGroup.currentFrame === animationGroup.frames.length){
                    animationGroup.currentFrame=0
                }
            }else{
                animationGroup.intervalCount++
            }

            // set animation group data back to the state
            animations[id] = animationGroup
            return current
        }
    }
}