var canvas = document.getElementById("builder-canvas");
var ctx = canvas.getContext("2d");
var mousePos = {x: 0, y: 0};
var dragging = -1;

var borders = [
	{x: 0, y: 0, width: 1000, height: 60}, 
	{x: 0, y: 740, width: 1000, height: 60}, 
	{x: 0, y: 0, width: 20, height: 800}, 
	{x: 980, y: 0, width: 20, height: 800}, 
	];

var atoms = {};
var atomIndex = 0;
var bonds = {};
var bondIndex = 0;
var bonding = -1;

var moveSymbol = new Image();
moveSymbol.src = "assets/move.png";
var clearSymbol = new Image();
clearSymbol.src = "assets/clear.png";
var eraseSymbol = new Image();
eraseSymbol.src = "assets/erase.png";
var diagramSymbol = new Image();
diagramSymbol.src = "assets/diagram.png";

var names = [
	{name: "Move", symbol: moveSymbol}, 
	{name: "Clear", symbol: clearSymbol}, 
	{name: "Erase", symbol: eraseSymbol}, 
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
	{name: "Change Structural-Line Diagram", symbol: diagramSymbol},
	{name: "Get Name", symbol: "Get Name"}
	];

var atomSymbols = ["B", "C", "H", "N", "O", "P", "S", "F", "Cl", "Br", "I"];
var bondSymbols = ["–", "=", "≡"];
var buttons = [];
var pressedButton = names[0];
var lineDiagram = false;
var moleculeName = "";

var startX = 50;
for (var i = 0; i < names.length - 1; i++) {
	buttons.push({x: startX, y: 10, width: 40, height: 40, type: names[i]});
	startX += 50;
}
buttons.push({x: 750, y: 750, width: 150, height: 40, type: names[names.length-1]});

canvas.addEventListener("mousemove", function (evt) {
    mousePos = getMousePos(canvas, evt);
    if (dragging >= 0) {
    	atoms[dragging].x = mousePos.x;
    	atoms[dragging].y = mousePos.y;
    }
});

canvas.addEventListener("mousedown", function () {
	if (pressedButton.name == "Move") {
		for (i in atoms) {
			if (inCircle(mousePos, atoms[i])) {
				dragging = i;
				break;
			}
		}
	}
});

canvas.addEventListener("mouseup", function () {
	dragging = -1;
});

function getSmiles() {
	var atom = atoms[Math.min(...Object.keys(atoms))];
	var smiles = atom.element;
	// const smilesBonds = {'–':'', '=':'=', '≡':'%23'}
	// while (true) {
	// 	for (i in bonds) {
	// 		bond = bonds[i];
	// 		if (bond.a1 == atom) {

	// 		}
	// 		else if (bond.a2 == atom) {
				
	// 		}
	// 	}
	// }
	return smiles;
}

function manageErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

canvas.addEventListener("click", function () {
	findButton: {
		for (button of buttons) {
			if (inRect(mousePos, button)) {
				if (bonding >= 0) bonding = -1;
				if (button.type.name == "Clear") {
					atoms = {};
					bonds = {};
				}
				else if (button.type.name == "Get Name") {
					fetch(`https://cactus.nci.nih.gov/chemical/structure/${getSmiles()}/iupac_name`)
						.then(manageErrors)
						.then(function(response) {
							response.text().then((data) => moleculeName = data)
						}).catch(function(error) {
							moleculeName = 'ERROR';
						});
				}
				else if (button.type.name == "Change Structural-Line Diagram") {
					lineDiagram = !lineDiagram;
				}
				else pressedButton = button.type;
				break findButton;
			}
		}
		findAtom: {
			for (i in atoms) {
				if (inCircle(mousePos, atoms[i])) {
					if (pressedButton.name == "Erase") {
						for (j in bonds) {
							bond = bonds[j];
							if (bond.a1 == i | bond.a2 == i)
								delete bonds[j];
						}
						delete atoms[i];
					}
					else if (/[–=≡]/.test(pressedButton.symbol)) {
						if (bonding >= 0) {
							findBond: {
								for (j in bonds) {
									bond = bonds[j];
									if ((bond.a1 == bonding && bond.a2 == i) | (bond.a1 == i && bond.a2 == bonding)) {
										bond.type = pressedButton.symbol;
										bonding = -1;
										break findBond;
									}
								}
								bonds[bondIndex] = {a1: bonding, a2: i, type: pressedButton.symbol};
								bondIndex++;
								bonding = -1;
							}
						}
						else bonding = i;
					}
					else if (atomSymbols.includes(pressedButton.symbol)) {
						atoms[i].element = pressedButton.symbol;
					}
					break findAtom;
				}
			}
			if (atomSymbols.includes(pressedButton.symbol)) {
				atoms[atomIndex] = {x: mousePos.x, y: mousePos.y, element: pressedButton.symbol};
				atomIndex++;
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
	ctx.textBaseline = "middle";
    ctx.textAlign = "center";
	for (var i = 0; i < borders.length; i++) {
		b = borders[i];
		ctx.fillRect(b.x, b.y, b.width, b.height);
	}
	for (var i = 0; i < buttons.length - 1; i++) {
		b = buttons[i];
		if (inRect(mousePos, b) | b.type.name == pressedButton.name)
			ctx.fillStyle = "#a1e6c5";
		else 
			ctx.fillStyle = "#cdf7e2";
		ctx.fillRect(b.x, b.y, b.width, b.height);
		if (atomSymbols.includes(b.type.symbol) | bondSymbols.includes(b.type.symbol)) {
			ctx.fillStyle = "black";
			ctx.font = "24px sans-serif";
			if (b.type.symbol == "=") ctx.fillText(b.type.symbol, b.x + b.width/2, b.y + b.height/2 + 2);
			else ctx.fillText(b.type.symbol, b.x + b.width/2, b.y + b.height/2 + 3);
		}
		else {
			if (b.type.symbol == diagramSymbol) ctx.drawImage(b.type.symbol, b.x, b.y);
			else ctx.drawImage(b.type.symbol, b.x + 8, b.y + 7);
		}
		ctx.fillStyle = "black";
		ctx.font = "14px sans-serif";
		if (inRect(mousePos, b)) ctx.fillText(b.type.name, 500, 80);
	}
	b = buttons[buttons.length-1];
	if (inRect(mousePos, b))
		ctx.fillStyle = "#158acf";
	else 
		ctx.fillStyle = "#38b0f5";
	ctx.fillRect(b.x, b.y, b.width, b.height);
	ctx.fillStyle = "white";
	ctx.font = "24px sans-serif";
	ctx.fillText(b.type.symbol, b.x + b.width/2, b.y + b.height/2 + 3);
	ctx.fillStyle = "#dcf2e7";
	ctx.fillRect(100, 750, 640, 40);
	ctx.fillStyle = "black";
    // ctx.textAlign = "left";
    ctx.fillText(moleculeName, 420, 773);
}

function slope(a, b) {
	return (a.y - b.y) / (a.x - b.x);
}

function gaps(a, b, r) {
	var m = slope(a, b);
	if (m == Infinity) 
		return {x: 0, y: -r};
	else if (m == -Infinity) 
		return {x: 0, y: r}
	else {
		var gapX = r/(Math.sqrt(m**2 + 1)) * (a.x <= b.x ? 1 : -1);
		return {x: gapX, y: m * gapX};
	}
}

function drawBonds() {
	if (bonding >= 0 && !inCircle(mousePos, atoms[bonding])) {
		var atom = atoms[bonding]
		var singleGaps = gaps(atom, mousePos, 18);
		ctx.beginPath();
		ctx.moveTo(atom.x + singleGaps.x, atom.y + singleGaps.y);
		ctx.lineTo(mousePos.x, mousePos.y);
		ctx.stroke();
		if (pressedButton.symbol == "=" | pressedButton.symbol == "≡") {
			var doubleGaps = gaps(atom, {x: atom.x - (mousePos.y - atom.y), y: atom.y + (mousePos.x - atom.x)}, 9);
			ctx.beginPath();
			ctx.moveTo(atom.x + singleGaps.x + doubleGaps.x, atom.y + singleGaps.y + doubleGaps.y);
			ctx.lineTo(mousePos.x + doubleGaps.x, mousePos.y + doubleGaps.y);
			ctx.stroke();
		}
		if (pressedButton.symbol == "≡") {
			var tripleGaps = gaps(atom, {x: atom.x + (mousePos.y - atom.y), y: atom.y - (mousePos.x - atom.x)}, 9);
			ctx.beginPath();
			ctx.moveTo(atom.x + singleGaps.x + tripleGaps.x, atom.y + singleGaps.y + tripleGaps.y);
			ctx.lineTo(mousePos.x + tripleGaps.x, mousePos.y + tripleGaps.y);
			ctx.stroke();
		}
	}
	for (i in bonds) {
		var a1 = atoms[bonds[i].a1], a2 = atoms[bonds[i].a2], singleGaps = gaps(a1, a2, 18);
		ctx.beginPath();
		ctx.moveTo(a1.x + singleGaps.x, a1.y + singleGaps.y);
		ctx.lineTo(a2.x - singleGaps.x, a2.y - singleGaps.y);
		ctx.stroke();
		if (bonds[i].type == "=" | bonds[i].type == "≡") {
			var doubleGaps = gaps(a1, {x: a1.x - (a2.y - a1.y), y: a1.y + (a2.x - a1.x)}, 9);
			ctx.beginPath();
			ctx.moveTo(a1.x + singleGaps.x + doubleGaps.x, a1.y + singleGaps.y + doubleGaps.y);
			ctx.lineTo(a2.x - singleGaps.x + doubleGaps.x, a2.y - singleGaps.y + doubleGaps.y);
			ctx.stroke();
		}
		if (bonds[i].type == "≡") {
			var tripleGaps = gaps(a1, {x: a1.x + (a2.y - a1.y), y: a1.y - (a2.x - a1.x)}, 9);
			ctx.beginPath();
			ctx.moveTo(a1.x + singleGaps.x + tripleGaps.x, a1.y + singleGaps.y + tripleGaps.y);
			ctx.lineTo(a2.x - singleGaps.x + tripleGaps.x, a2.y - singleGaps.y + tripleGaps.y);
			ctx.stroke();
		}
	}
}

function drawAtoms() {
	ctx.textBaseline = "middle";
	ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
	for (var i in atoms) {
		ctx.beginPath();
		let a = atoms[i];
		if (inCircle(mousePos, a)) {
			ctx.fillStyle = "rgba(194, 194, 194, 0.5)";
			ctx.arc(a.x, a.y, 18, 0, 2 * Math.PI);
			ctx.fill();
			break;
		}
	}
	for (var i in atoms) {
		let a = atoms[i];
		ctx.fillStyle = "black";
		ctx.fillText(a.element, a.x, a.y);
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