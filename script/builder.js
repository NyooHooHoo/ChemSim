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

var names = [
	{name: "Move", symbol: ""}, 
	{name: "Clear", symbol: ""}, 
	{name: "Erase", symbol: ""}, 
	{name: "Single Bond", symbol: "–"}, 
	{name: "Double Bond", symbol: "="}, 
	{name: "Triple Bond", symbol: "≡"}, 
	{name: "Hydrogen", symbol: "H"}, 
	{name: "Boron", symbol: "B"}, 
	{name: "Carbon", symbol: "C"}, 
	{name: "Nitrogen", symbol: "N"}, 
	{name: "Oxygen", symbol: "O"}, 
	{name: "Phosphorus", symbol: "P"},
	{name: "Sulfur", symbol: "S"}, 
	{name: "Fluorine", symbol: "F"}, 
	{name: "Chlorine", symbol: "Cl"}, 
	{name: "Bromine", symbol: "Br"}, 
	{name: "Iodine", symbol: "I"}, 
	{name: "Change Structural-Line Diagram", symbol: ""}
	];

var atomSymbols = ["B", "C", "H", "N", "O", "P", "S", "F", "Cl", "Br", "I"];
var bondSymbols = ["–", "=", "≡"];
var buttons = [];
var pressedButton = names[0];

var startX = 50;
for (var i = 0; i < names.length; i++) {
	buttons.push({x: startX, y: 10, width: 40, height: 40, type: names[i]});
	startX += 50;
}

canvas.addEventListener("mousemove", function (evt) {
    mousePos = getMousePos(canvas, evt);
});

canvas.addEventListener("click", function (evt) {
	find: {
		for (button of buttons) {
			if (inRect(mousePos, button)) {
				if (button.type.name == "Clear") {
					atoms = {};
					bonds = {};
				}
				else pressedButton = button.type;
				break find;
			}
		}
		if (atomSymbols.includes(pressedButton.symbol)) {
			atoms[atomIndex] = {x: mousePos.x, y: mousePos.y, element: pressedButton.symbol};
			atomIndex++;
			console.log(atoms);
		}
		else if (pressedButton.name == "Erase") {
			console.log("hello");
			for (i in atoms) {
				console.log("hi");
				if (inCircle(mousePos, atoms[i])) {
					delete atoms[i];
					break;
				}
				console.log(atoms);
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
		if (inRect(mousePos, b) | b.type.name == pressedButton.name)
			ctx.fillStyle = "#a1e6c5";
		else 
			ctx.fillStyle = "#cdf7e2";
		ctx.fillRect(b.x, b.y, b.width, b.height);
		ctx.fillStyle = "black";
		ctx.font = "24px sans-serif";
		if (b.type.symbol == "=") ctx.fillText(b.type.symbol, b.x + b.width/2, b.y + b.height/2 + 2);
		else ctx.fillText(b.type.symbol, b.x + b.width/2, b.y + b.height/2 + 3);
		ctx.font = "14px sans-serif";
		if (inRect(mousePos, b)) ctx.fillText(b.type.name, 500, 80);
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
		if (inCircle(mousePos, a) && !atomSymbols.includes(pressedButton.symbol)) {
			ctx.fillStyle = "#c2c0c0";
			ctx.arc(a.x, a.y, 18, 0, 2 * Math.PI);
			ctx.fill();
			break;
		}
	}
	for (var i in atoms) {
		let a = atoms[i];
		ctx.fillStyle = "black";
		ctx.fillText(a.element, a.x, a.y + 3);
	}
}

function inRect(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
}

function inCircle(pos, circle) {
	return Math.sqrt((pos.x - circle.x)**2 + (pos.y - circle.y)**2) < 18;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

animate();