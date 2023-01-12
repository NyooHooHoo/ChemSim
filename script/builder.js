var canvas = document.getElementById("builderCanvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
let intervalID;
var mousePos;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener("mousedown", function (evt) {
    mousePos = getMousePos(canvas, evt);
    intervalID = setInterval(draw, 10);
}, false);

canvas.addEventListener("mousemove", function (evt) {
    mousePos = getMousePos(canvas, evt);
}, false);

canvas.addEventListener("mouseup", function () {
	clearInterval(intervalID)
	background()
}, false);

canvas.addEventListener("mouseleave", function () {
	clearInterval(intervalID)
	background()
}, false);

function background() {
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
	background()	
    ctx.fillStyle = "black";
    ctx.arc(mousePos.x, mousePos.y, 10, 0, Math.PI*2);
    ctx.fill();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}