// Initializing Canvas and Context
var canvas = document.getElementById("builder-canvas");
var ctx = canvas.getContext("2d");
var mousePos = {x: 0, y: 0}; // Store mouse position
var dragging = -1; // Store atom being dragged

// Four rectangle objects for borders
var borders = [
	{x: 0, y: 0, width: 1000, height: 60}, 
	{x: 0, y: 740, width: 1000, height: 60}, 
	{x: 0, y: 0, width: 20, height: 800}, 
	{x: 980, y: 0, width: 20, height: 800}, 
	];

// Atoms and bonds
var atoms = {};
var atomIndex = 0;
var bonds = {};
var bondIndex = 0;
var bonding = -1;

// Images for buttons
var moveSymbol = new Image();
moveSymbol.src = "assets/move.png";
var clearSymbol = new Image();
clearSymbol.src = "assets/clear.png";
var eraseSymbol = new Image();
eraseSymbol.src = "assets/erase.png";

// Names and symbols for all buttons
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
	{name: "Get Name", symbol: "Get Name"}
	];

var atomSymbols = ["B", "C", "H", "N", "O", "P", "S", "F", "Cl", "Br", "I"];
var bondSymbols = ["–", "=", "≡"];
var buttons = [];
var pressedButton = names[0];
var moleculeName = "";

// For loop to set positions for each button
var startX = 75;
for (var i = 0; i < names.length - 1; i++) {
	buttons.push({x: startX, y: 10, width: 40, height: 40, type: names[i]});
	startX += 50;
}
buttons.push({x: 750, y: 750, width: 150, height: 40, type: names[names.length-1]});

canvas.addEventListener("mousemove", function (evt) {
    mousePos = getMousePos(canvas, evt); // Update mouse position when moved
    if (dragging >= 0) { // Update atom position if it is being dragged by mouse
    	atoms[dragging].x = mousePos.x;
    	atoms[dragging].y = mousePos.y;
    }
});

canvas.addEventListener("mousedown", function () {
	if (pressedButton.name == "Move") {
		for (i in atoms) {
			if (inCircle(mousePos, atoms[i])) { // Set new dragging atom if mouse clicks on it while on Move tool
				dragging = i;
				break;
			}
		}
	}
});

canvas.addEventListener("mouseup", function () {
	dragging = -1; // Stop dragging atom when mouse released
});

function getSmiles(a, visited) { // Recursive function to generate SMILES string for current moledule
	var atom = atoms[a];
	var smiles = atom.element;
	visited.push(a);
	const smilesBonds = {'–':'', '=':'=', '≡':'%23'}
	var foundBond = false;
	for (i in bonds) {
		bond = bonds[i];
		if (bond.a1 == a | bond.a2 == a) {
			var partner = parseInt((bond.a1 == a ? bond.a2 : bond.a1));
			if (!visited.includes(partner)) {
				foundBond = true;
				smiles += "(" + smilesBonds[bond.type];
				smiles += getSmiles(partner, visited).str; // Depth-first search to traverse molecule "tree"
				smiles += ")";
			}
		}
	}
	return {str: smiles, parts: visited};
}

function manageErrors(response) { // Method to handle 404 Errors from Fetch when invalid molecule requested
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

canvas.addEventListener("click", function () { 
	findButton: {
		for (button of buttons) {
			if (inRect(mousePos, button)) {
				if (bonding >= 0) bonding = -1; // Cancel any bond being drawn if a button clicked
				if (button.type.name == "Clear") { // Reset canvas but don't select clear button when clicked
					moleculeName = '';
					atoms = {};
					bonds = {};
				}
				else if (button.type.name == "Get Name" && Object.keys(atoms).length > 0) {
					moleculeName = '...';
					var firstAtom = Math.min(...Object.keys(atoms)); // Finding lowest key for staring atom of the search
					var SMILES = getSmiles(firstAtom, []);
					displayName: {
						for (i in atoms) {
							if (!SMILES.parts.includes(parseInt(i))) { // All atoms must be connected to generate molecule name, error if any extra found
								moleculeName = 'error: multiple molecules in the canvas.';
								break displayName;
							}
						}
						fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${SMILES.str}/property/IUPACName/JSON`)
							.then(response => response.json())
							.then(data => {
						    	moleculeName = data.PropertyTable.Properties[0].IUPACName;
						  	})
						  	.catch(error => {
						    	moleculeName = 'error: molecule does not exist.';
						  	});
					}
				}
				else {
					pressedButton = button.type; // All other buttons are tools that become selected
				}
				break findButton;
			}
		}
		findAtom: {
			for (i in atoms) {
				if (inCircle(mousePos, atoms[i])) {
					if (pressedButton.name != "Move") moleculeName = ''; // Clear molecule name if any atoms clicked with non-move tool
					if (pressedButton.name == "Erase") {
						for (j in bonds) {
							bond = bonds[j];
							if (bond.a1 == i | bond.a2 == i)
								delete bonds[j]; // Delete all bonds containing an atom if erased
						}
						delete atoms[i]; 
					}
					else if (/[–=≡]/.test(pressedButton.symbol)) {
						if (bonding >= 0) {
							findBond: {
								for (j in bonds) {
									bond = bonds[j];
									if ((bond.a1 == bonding && bond.a2 == i) | (bond.a1 == i && bond.a2 == bonding)) {
										bond.type = pressedButton.symbol; // Only change the type if a bond between two atoms already exists
										bonding = -1;
										break findBond;
									}
								}
								bonds[bondIndex] = {a1: bonding, a2: i, type: pressedButton.symbol}; // Create new bond with indexes of bonding and clicked atom
								bondIndex++;
								bonding = -1;
							}
						}
						else bonding = i; // Start new bond if not already 
					}
					else if (atomSymbols.includes(pressedButton.symbol)) {
						atoms[i].element = pressedButton.symbol; // Only change the element of existing atom if clicked with atom tool
					}
					break findAtom;
				}
			}
			if (atomSymbols.includes(pressedButton.symbol)) {
				for (border of borders) { // Limit creating new atoms to within borders
					if (inRect(mousePos, border)) 
						break findAtom;
				}
				moleculeName = '';
				atoms[atomIndex] = {x: mousePos.x, y: mousePos.y, element: pressedButton.symbol}; // Create new atom
				atomIndex++;
			}
		}
	}
});

function animate() { 
	window.requestAnimationFrame(animate); // Repeat drawings in main animate function using requestAnimationFrame
	background();
	drawBonds();
	drawAtoms();
	menus();
}

function background() { // White background
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function menus() {
	ctx.beginPath();
	ctx.fillStyle = "#31f791";
	ctx.textBaseline = "middle";
    ctx.textAlign = "center";
	for (var i = 0; i < borders.length; i++) { // Drawing borders
		b = borders[i];
		ctx.fillRect(b.x, b.y, b.width, b.height);
	}
	for (var i = 0; i < buttons.length - 1; i++) { // Drawing buttons
		b = buttons[i];
		if (inRect(mousePos, b) | b.type.name == pressedButton.name) // Change fill colour when hovered
			ctx.fillStyle = "#a1e6c5";
		else 
			ctx.fillStyle = "#cdf7e2";
		ctx.fillRect(b.x, b.y, b.width, b.height);
		if (atomSymbols.includes(b.type.symbol) | bondSymbols.includes(b.type.symbol)) { // Text symbol for atoms and bonds
			ctx.fillStyle = "black";
			ctx.font = "24px sans-serif";
			if (b.type.symbol == "=") ctx.fillText(b.type.symbol, b.x + b.width/2, b.y + b.height/2 + 2);
			else ctx.fillText(b.type.symbol, b.x + b.width/2, b.y + b.height/2 + 3);
		}
		else ctx.drawImage(b.type.symbol, b.x + 8, b.y + 7); // Image symbol for move, clear, and erase
		ctx.fillStyle = "black";
		ctx.font = "14px sans-serif";
		if (inRect(mousePos, b)) ctx.fillText(b.type.name, 500, 80); // Display name of currently hovered button for user
	}
	b = buttons[buttons.length-1]; // Get Name button at bottom menu
	if (inRect(mousePos, b))
		ctx.fillStyle = "#158acf";
	else 
		ctx.fillStyle = "#38b0f5";
	ctx.fillRect(b.x, b.y, b.width, b.height);
	ctx.fillStyle = "white";
	ctx.font = "24px sans-serif";
	ctx.fillText(b.type.symbol, b.x + b.width/2, b.y + b.height/2 + 3);
	ctx.fillStyle = "#dcf2e7";
	ctx.fillRect(100, 750, 640, 40); // Box for molecule name
	ctx.fillStyle = "black";
    ctx.fillText(moleculeName, 420, 773); // Display molecule name
}

function gaps(a, b, r) { // Calculate intersection of line and circle to find gap margins needed for bond lines on atoms
	var m = (a.y - b.y) / (a.x - b.x);
	if (m == Infinity) 
		return {x: 0, y: -r};
	else if (m == -Infinity) 
		return {x: 0, y: r}
	else {
		var gapX = r/(Math.sqrt(m**2 + 1)) * (a.x <= b.x ? 1 : -1);
		return {x: gapX, y: m * gapX}; // Return x and y shifts needed
	}
}

function drawBonds() {
	if (bonding >= 0 && !inCircle(mousePos, atoms[bonding])) { // Dynamic line following mouse when creating new bond
		var atom = atoms[bonding] // First line
		var singleGaps = gaps(atom, mousePos, 18); // Calculte gaps
		ctx.beginPath();
		ctx.moveTo(atom.x + singleGaps.x, atom.y + singleGaps.y);
		ctx.lineTo(mousePos.x, mousePos.y);
		ctx.stroke();
		if (pressedButton.symbol == "=" | pressedButton.symbol == "≡") { // Second line
			var doubleGaps = gaps(atom, {x: atom.x - (mousePos.y - atom.y), y: atom.y + (mousePos.x - atom.x)}, 9); // Calculate new gaps perpendicular to current line
			ctx.beginPath();
			ctx.moveTo(atom.x + singleGaps.x + doubleGaps.x, atom.y + singleGaps.y + doubleGaps.y);
			ctx.lineTo(mousePos.x + doubleGaps.x, mousePos.y + doubleGaps.y);
			ctx.stroke();
		}
		if (pressedButton.symbol == "≡") { // Third line
			var tripleGaps = gaps(atom, {x: atom.x + (mousePos.y - atom.y), y: atom.y - (mousePos.x - atom.x)}, 9); // Calculate new gaps perpendicular to current line, opposite side
			ctx.beginPath();
			ctx.moveTo(atom.x + singleGaps.x + tripleGaps.x, atom.y + singleGaps.y + tripleGaps.y);
			ctx.lineTo(mousePos.x + tripleGaps.x, mousePos.y + tripleGaps.y);
			ctx.stroke();
		}
	}
	for (i in bonds) { // Loop through all exisitng bonds to draw between atoms
		var a1 = atoms[bonds[i].a1], a2 = atoms[bonds[i].a2], singleGaps = gaps(a1, a2, 18); // First line
		ctx.beginPath();
		ctx.moveTo(a1.x + singleGaps.x, a1.y + singleGaps.y);
		ctx.lineTo(a2.x - singleGaps.x, a2.y - singleGaps.y);
		ctx.stroke();
		if (bonds[i].type == "=" | bonds[i].type == "≡") { // Second line
			var doubleGaps = gaps(a1, {x: a1.x - (a2.y - a1.y), y: a1.y + (a2.x - a1.x)}, 9);
			ctx.beginPath();
			ctx.moveTo(a1.x + singleGaps.x + doubleGaps.x, a1.y + singleGaps.y + doubleGaps.y);
			ctx.lineTo(a2.x - singleGaps.x + doubleGaps.x, a2.y - singleGaps.y + doubleGaps.y);
			ctx.stroke();
		}
		if (bonds[i].type == "≡") { // Third line
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
		if (inCircle(mousePos, a)) { // Draw grey circle behind atoms when hovered
			ctx.fillStyle = "rgba(194, 194, 194, 0.5)";
			ctx.arc(a.x, a.y, 18, 0, 2 * Math.PI);
			ctx.fill();
			break;
		}
	}
	for (var i in atoms) { // Draw text for element symbol of each atom
		let a = atoms[i];
		ctx.fillStyle = "black";
		ctx.fillText(a.element, a.x, a.y);
	}
}

function inRect(pos, rect) { // Find if mouse position in a rectangle (for buttons and borders)
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
}

function inCircle(pos, circle) { // Find if mosue position in a circle (for atoms)
	return Math.sqrt((pos.x - circle.x)**2 + (pos.y - circle.y)**2) < 18;
}

function getMousePos(canvas, evt) { // Get mouse position given mouse event (used on mousemove listener)
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

animate(); // Initial call of animate() to begin program