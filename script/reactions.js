var canvas = document.getElementById("reaction-simulation");
if (canvas.getContext) var ctx = canvas.getContext("2d"); else alert("Canvas element is not available");

var width = canvas.width;
var height = canvas.height;

var synCol = "white";
var decCol = "white";
var sDisCol = "white";
var dDisCol = "white";
var cComCol = "white";
var iComCol = "white";


var frameCnt = 0;

const intervalID = setInterval(draw, 10);         

var bg1 = new Image();
bg1.src = "assets/chemBG.png";

//returns the mouse position
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

//Binding the click event on the canvas
canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if(isInside(mousePos, synthesis)){
        synCol = "yellow";
    }else{
        synCol = "white";
    }

    if(isInside(mousePos, decomposition)){
        decCol = "yellow";
    }else{
        decCol = "white";
    }

    if(isInside(mousePos, sDisplace)){
        sDisCol = "yellow";
    }else{
        sDisCol = "white";
    }

    if(isInside(mousePos, dDisplace)){
        dDisCol = "yellow";
    }else{
        dDisCol = "white";
    }

    if(isInside(mousePos, cCombustion)){
        cComCol = "yellow";
    }else{
        cComCol = "white";
    }

    if(isInside(mousePos, iCombustion)){
        iComCol = "yellow";
    }else{
        iComCol = "white";
    }



}, false);

canvas.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(canvas, evt);


}, false);


function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}


//6 objects to hold the 6 different animations
var synthesis = {
    x:112,
    y:235,
    width:250,
    height:125
};

var decomposition = {
    x:474,
    y:235,
    width:250,
    height:125
};

var sDisplace = {
    x:836,
    y:235,
    width:250,
    height:125
};

var dDisplace = {
    x:112,
    y:448,
    width:250,
    height:125
};

var cCombustion ={
    x:474,
    y:448,
    width:250,
    height:125
};

var iCombustion = {
    x:836,
    y:448,
    width:250,
    height:125
};



function draw(){
    if(frameCnt == 0){
        ctx.drawImage(bg1, 0, 0);

        ctx.font = "80px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Chemical Reactions Simulator", canvas.width/2, 125);

        //drawing the buttons to move to different animation
        ctx.fillStyle = synCol;
        ctx.roundRect(synthesis.x,synthesis.y,synthesis.width,synthesis.height,10);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = decCol;
        ctx.roundRect(decomposition.x,decomposition.y,decomposition.width,decomposition.height,10);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = sDisCol;
        ctx.roundRect(sDisplace.x,sDisplace.y,sDisplace.width,sDisplace.height,10);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = dDisCol;
        ctx.roundRect(dDisplace.x,dDisplace.y,dDisplace.width,dDisplace.height,10);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = cComCol;
        ctx.roundRect(cCombustion.x,cCombustion.y,cCombustion.width,cCombustion.height,10);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = iComCol;
        ctx.roundRect(iCombustion.x,iCombustion.y,iCombustion.width,iCombustion.height,10);
        ctx.fill();
        ctx.beginPath();
    }


}

draw();

