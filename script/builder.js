var canvas = document.getElementById("builderCanvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
let intervalID;
var mousePos;

background();

canvas.addEventListener("mousedown", function (evt) {
    mousePos = getMousePos(canvas, evt);
    intervalID = setInterval(draw, 10);
});

canvas.addEventListener("mousemove", function (evt) {
    mousePos = getMousePos(canvas, evt);
});

canvas.addEventListener("mouseup", function () {
	clearInterval(intervalID);
	background();
});

canvas.addEventListener("mouseleave", function () {
	clearInterval(intervalID);
	background();
});

function background() {
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	menus();
}

function menus() {
	ctx.beginPath();
	ctx.fillStyle = "#31f791";
	ctx.fillRect(0,0,1000,60);
	ctx.fillRect(0,540,1000,600);
	ctx.fillRect(0,0,20,600);
	ctx.fillRect(980,0,1000,600);
}

function draw() {
	background();
    ctx.fillStyle = "black";
    ctx.arc(mousePos.x, mousePos.y, 10, 0, Math.PI*2);
    ctx.fill();
}

function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}