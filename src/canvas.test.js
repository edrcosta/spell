const { SpellCanvas } = require('./canvas')


document = {
    getElementById: () => {
        return {
            getContext: () => {
            }
        }
    }
}

getComputedStyle = () => {
    return {
        getPropertyValue: () => {
            slice: () => 400
        }
    }
}


canvas = new SpellCanvas('element-test')

describe('canvas.js', () => {
    // describe('isMobile', () => {})

    describe('horizontal', () => {

    })

    // describe('vertical', () => {})

    // describe('getRandomInt', () => {})

    // describe('clear', () => {})

    // describe('fixDpi', () => {})

    // describe('drawPixel', () => {})

    // describe('drawPixelSprites', () => {})

    // describe('drawPixelSprite', () => {})

    // describe('drawImage', () => {})

    // describe('drawImages', () => {})

    // describe('resetFrame', () => {})

    // describe('__drawImageOnCanvas', () => {})

    // describe('setBackgroundColor', () => {})

    // describe('drawText', () => {})

    // describe('show', () => {})
})