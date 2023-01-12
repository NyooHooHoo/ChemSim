// myCanvas = document.getElementById("builderCanvas");
// myContext = myCanvas.getContext("2d");
// function draw(ctx,canvas) {
// 	ctx.fillstyle = "green"
// 	ctx.arc(10,10,10,0, Math.PI*2)
// 	ctx.fill()
// }
// draw(myContext,myCanvas);

var myCanvas = document.getElementById("builderCanvas");
var myCtx = myCanvas.getContext("2d");

// report the mouse position on click
myCanvas.addEventListener("mousedown", function (evt) {
    var mousePos = getMousePos(myCanvas, evt);
    let intervalID = setInterval(draw, 10);
}, false);

myCanvas.addEventListener("mouseup", function () {clearInterval(intervalID)}, false);

function draw() {
    myCtx.fillStyle = "black";
    myCtx.arc(mousePos.x, mousePos.y, 10, Math.PI*2);
    myCtx.fill();
}

// Get Mouse Position
function getMousePos(canvas, evt) {
    var rect = myCanvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}