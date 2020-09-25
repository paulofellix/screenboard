import Controls from "./controls/index.js"

export function Board (canvas) {

    let history = [];
    let controlKey = 0;

    // Working inside canvas, but it's a 2d or 3d context?
    const context = canvas.getContext('2d')

    // catch painting
    let isDrawning = false

    // setup controls
    const controls = new Controls(context)

    // clear the canvas
    canvas.addEventListener('wheel', resizePencil);
    
    function resizePencil(event) {
        if (event.ctrlKey){
            const size = document.querySelector('#size')

            if (event.wheelDelta > 0){
                if (size.value < 30) {
                    controls.size.increaseSize()
                    size.value++
                }
            }else{
                if (size.value > 0) {
                    controls.size.decreaseSize()
                    size.value--
                }
            }
            controls.updateAll()
        }
    }

    function clearCanvas() { 
        context.clearRect(0, 0, canvas.width, canvas.height);
        var w = canvas.width;
        canvas.width = 1;
        canvas.width = w;   
    }

    init() // it will start here

    // it will start here
    function init() {
        resize()

        // when resize window
        window.addEventListener('resize', resize)

        // when mouse down
        canvas.addEventListener('mousedown', startPressPen)

        // when mouse up
        canvas.addEventListener('mouseup', stopPressPen)

        // when mouse moving
        canvas.addEventListener('mousemove', draw)

    }

    // when change window size, resize canvas
    function resize() {
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth
    }

    // When put pen on board and press to draw
    function startPressPen(event) {
        if (event.button === 0){
            controlKey++;

            isDrawning = true
    
            // start draw here, go make some dots
            draw(event)
        }else if (event.button === 1){
            clearCanvas()
        }else if (event.button === 2){
            const lineWidth = context.lineWidth

            history
                .filter(k => k.controlKey === controlKey)
                .forEach(k => {
                    context.lineWidth = k.lineWidth + 1
                    context.globalCompositeOperation = "destination-out"
                    context.lineTo(k.x, k.y)
                    context.stroke()
                    context.beginPath()
                    context.moveTo(k.x, k.y)
                })
            
            history = history.filter(k => k.controlKey !== controlKey)
            controlKey--
            context.lineWidth = lineWidth
        }
    }

    // When get out pen of board and stop
    function stopPressPen() {
        isDrawning = false

        // need to stop the line, so I need to restart the line
        context.beginPath()
    }

    // let's draw when press and moving pen
    function draw (event) {
        // update controls
        controls.updateAll()
        
        // Am I drawning?
        if (!isDrawning) return;

        

        // basic init style of line, in case of it's no control
        // context.lineWidth = 5;
        // context.strokeStyle = 'red'
        context.lineCap = 'round'


        // drawning the line geting mouse position
        const [pointX, pointY] = [event.clientX, event.clientY]
        if (controls.cursor.cursor.name === 'pencil'){
            history.push({
                controlKey: controlKey,
                lineWidth: context.lineWidth,
                x: pointX,
                y: pointY
            })
        }
        context.lineTo(pointX, pointY)
        context.stroke() // visualize the line

        // I need to start small circle and update his position
        // to get more round line
        context.beginPath()
        context.moveTo(event.clientX, event.clientY)
    }

    // clears the entire screen
    function clear () {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

}
