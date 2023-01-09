// myCanvas = document.getElementById("builderCanvas");
// myContext = myCanvas.getContext("2d");
// function draw(ctx,canvas) {
// 	ctx.fillstyle = "green"
// 	ctx.arc(10,10,10,0, Math.PI*2)
// 	ctx.fill()
// }
// draw(myContext,myCanvas);

var myCanvas = document.getElementById("builderCanvas");
var myCtx = canvas.getContext("2d");

//report the mouse position on click
canvas.addEventListener("mouseover", function (evt) {
    var mousePos = getMousePos(canvas, evt);
    intervalID = setInterval(draw, 10);
}, false);

function draw(canvas, ctx) {
	ctx.fillStyle = "rgba(1,1,1,1)";
    ctx.arc(mousePos.x, mousePos.y, 10, 0, Math.PI*2);
    ctx.fill();
}

//Get Mouse Position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}