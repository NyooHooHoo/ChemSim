var canvas = document.getElementById("reaction-simulation");
if (canvas.getContext) var ctx = canvas.getContext("2d"); else alert("Canvas element is not available");

//returns the mouse position
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

//Binding the click event on the canvas
canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    //do smth if the mouse is clicked



}, false);


/*
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}*/


//6 objects to hold the 6 different animations
var synthesis = {
    x:150,
    y:200,
    width:200,
    height:100
};

var decomposition = {
    x:500,
    y:200,
    width:200,
    height:100
};

var sDisplace = {
    x:850,
    y:200,
    width:200,
    height:100
};

var dDisplace = {
    x:100,
    y:400,
    width:200,
    height:100
};

var cCombustion ={
    x:450,
    y:400,
    width:200,
    height:100
};

var iCombustion = {
    x:800,
    y:400,
    width:200,
    height:100
};



function draw(){
    ctx.fillStyle = "grey";
    ctx.roundRect(synthesis.x,synthesis.y,synthesis.width,synthesis.height,10);
    ctx.roundRect(decomposition.x,decomposition.y,decomposition.width,decomposition.height,10);
    ctx.roundRect(sDisplace.x,sDisplace.y,sDisplace.width,sDisplace.height,10);
    ctx.roundRect(dDisplace.x,dDisplace.y,dDisplace.width,dDisplace.height,10);
    ctx.roundRect(cCombustion.x,cCombustion.y,cCombustion.width,cCombustion.height,10);
    ctx.roundRect(iCombustion.x,iCombustion.y,iCombustion.width,iCombustion.height,10);

    ctx.fill();

}

draw();

