var canvas = document.getElementById("builder-canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
let intervalID;
var mousePos;

let borders = [
	{x: 0, y: 0, width: 1000, height: 60}, 
	{x: 0, y: 540, width: 1000, height: 60}, 
	{x: 0, y: 0, width: 20, height: 600}, 
	{x: 980, y: 0, width: 20, height: 600}, 
];

let buttons = {};
var names = ["clear", "erase", "move", "single", "double", "triple", "H", "C", "O", "diagram"];
var startX = 20;
for (var i = 0; i < names.length; i++) {
	buttons[names[i]] = {x: startX, y: 10, width: 40, height: 40};
	startX += 50;
}


// canvas.addEventListener("mousedown", function (evt) {
//     mousePos = getMousePos(canvas, evt);
//     if (isInside(mousePos, space))
//     	intervalID = setInterval(draw, 10);
// });

canvas.addEventListener("mousemove", function (evt) {
    mousePos = getMousePos(canvas, evt);
});

// canvas.addEventListener("mouseup", function () {
// 	clearInterval(intervalID);
// 	background();
// });


function animate() {
	window.requestAnimationFrame(animate);
	background();
	menus();
}

function background() {
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function menus() {
	ctx.beginPath();
	ctx.fillStyle = "#31f791";
	for (var i = 0; i < borders.length; i++) {
		b = borders[i];
		ctx.fillRect(b.x, b.y, b.width, b.height);
	}
	ctx.fillStyle = "black";
	for (var i = 0; i < buttons.length; i++) {
		b = buttons[i];
		ctx.fillRect(b.x, b.y, b.width, b.height);
	}
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

animate();