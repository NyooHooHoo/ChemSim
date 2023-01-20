let canvas = document.getElementById("builder-canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let mousePos;


let borders = [
	{x: 0, y: 0, width: 1000, height: 60}, 
	{x: 0, y: 540, width: 1000, height: 60}, 
	{x: 0, y: 0, width: 20, height: 600}, 
	{x: 980, y: 0, width: 20, height: 600}, 
	];

let atoms = [];

let buttons = [];
let names = ["clear", "erase", "move", "single", "double", "triple", "B", "C", "H", "N", "O", "P", "S", "F", "Cl", "Br", "I", "diagram"];
let startX = 50;
for (let i = 0; i < names.length; i++) {
	buttons.push({x: startX, y: 10, width: 40, height: 40, name: names[i]});
	startX += 50;
}

canvas.addEventListener("mousemove", function (evt) {
    mousePos = getMousePos(canvas, evt);
});

canvas.addEventListener("click", function (evt) {
    atoms.push({x: mousePos.x, y: mousePos.y});
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
	for (let i = 0; i < borders.length; i++) {
		b = borders[i];
		ctx.fillRect(b.x, b.y, b.width, b.height);
	}
	ctx.textBaseline = "middle";
	ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
	for (let i = 0; i < buttons.length; i++) {
		b = buttons[i];
		ctx.fillStyle = "grey";
		ctx.fillRect(b.x, b.y, b.width, b.height);
		ctx.fillStyle = "black";
		ctx.fillText(b.name[0], b.x + b.width/2, b.y + b.height/2);
	}
}

function drawBonds() {

}

function drawAtoms() {
	ctx.fillStyle = "red";
	let a;
	for (let i = 0; i < atoms.length; i++) {
		ctx.beginPath();
		a = atoms[i];
		ctx.arc(a.x, a.y, 10, 0, 2 * Math.PI);
		ctx.fill();
	}
}

function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y;
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

animate();