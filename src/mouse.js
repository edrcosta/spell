export default class SpellMouse{
    position = {
        x: 0, y: 0
    }

    clicked = false
    
    initialize(canvas){
        const element = document.getElementById(canvas)
        element.addEventListener('mousemove', function (e) {
            this.position.x = e.pageX;
            this.position.y = e.pageY;
        }, /*useCapture=*/true);

        element.addEventListener('click', function(event){
            this.position = { x: event.clientX, y: event.clientY}
            this.clicked = true
        })

        element.addEventListener('touchend', function(event){
            this.position = {x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY}
            this.clicked = true
        })
    }
}