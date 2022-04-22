export default class SpellMouse{
    static position = {
        x: 0, y: 0
    }

    static clicked = false
    
    static initialize(canvas){
        const element = document.getElementById(canvas)
        element.addEventListener('mousemove', function (e) {
            SpellMouse.position.x = e.pageX;
            SpellMouse.position.y = e.pageY;
        }, /*useCapture=*/true);

        element.addEventListener('click', function(event){
            SpellMouse.position = { x: event.clientX, y: event.clientY}
            SpellMouse.clicked = true
        })

        element.addEventListener('touchend', function(event){
            SpellMouse.position = {x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY}
            SpellMouse.clicked = true
        })
    }
}