var canvas = document.getElementById("builder-canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var mousePos = {x: 0, y: 0};

var borders = [
	{x: 0, y: 0, width: 1000, height: 60}, 
	{x: 0, y: 540, width: 1000, height: 60}, 
	{x: 0, y: 0, width: 20, height: 600}, 
	{x: 980, y: 0, width: 20, height: 600}, 
	];

var atoms = {};
var atomIndex = 0;
var bonds = {};
var bondIndex = 0;

var buttons = [];
var pressedButton = "move";
var names = ["move", "clear", "erase", "single", "double", "triple", "B", "C", "H", "N", "O", "P", "S", "F", "Cl", "Br", "I", "diagram"];
var startX = 50;
for (var i = 0; i < names.length; i++) {
	buttons.push({x: startX, y: 10, width: 40, height: 40, name: names[i]});
	startX += 50;
}

canvas.addEventListener("mousemove", function (evt) {
    mousePos = getMousePos(canvas, evt);
});

canvas.addEventListener("click", function (evt) {
	find: {
		for (button of buttons) {
			if (inRect(mousePos, button)) {
				if (button.name == "clear") {
					atoms = {};
					bonds = {};
				}
				else pressedButton = button.name;
				break find;
			}
		}
		if (["B", "C", "H", "N", "O", "P", "S", "F", "Cl", "Br", "I"].includes(pressedButton)) {
			atoms[atomIndex] = {x: mousePos.x, y: mousePos.y, element: pressedButton};
			atomIndex++;
			console.log(atoms);
		}
		else if (pressedButton == "erase") {
			for (var i = 0; i < Object.keys(atoms).length; i++) {
				console.log("hi");
				if (inCircle(mousePos, atoms[i])) {
					delete atoms[i];
					break;
				}
			}
		}
	}
});

function animate() {
	window.requestAnimationFrame(animate);
	background();
	drawBonds();
	drawAtoms();
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
	for (var i = 0; i < buttons.length; i++) {
		b = buttons[i];
		if (inRect(mousePos, b) | b.name == pressedButton)
			ctx.fillStyle = "#bfbfbf";
		else 
			ctx.fillStyle = "grey";
		ctx.fillRect(b.x, b.y, b.width, b.height);
		ctx.fillStyle = "black";
		ctx.fillText(b.name[0], b.x + b.width/2, b.y + b.height/2);
	}
}

function drawBonds() {

}

function drawAtoms() {
	ctx.textBaseline = "middle";
	ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
	for (var i in atoms) {
		ctx.beginPath();
		let a = atoms[i];
		if (inCircle(mousePos, a)) {
			ctx.fillStyle = "grey";
			ctx.arc(a.x, a.y, 15, 0, 2 * Math.PI);
			ctx.fill();
		}
		ctx.fillStyle = "black";
		ctx.fillText(a.element, a.x, a.y);
	}
}

function inRect(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
}

function inCircle(pos, circle) {
	return Math.sqrt(pos.x**2 + pos.y**2) < 15;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

animate();