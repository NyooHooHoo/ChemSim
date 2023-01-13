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


var sceneNo = 0;

const intervalID = setInterval(draw, 10);         

var bg1 = new Image();
bg1.src = "assets/chemBG.png";

var bg2 = new Image();
bg2.src = "assets/labBG.jpg";

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
        synCol = "rgb(217, 219, 218)";
    }else{
        synCol = "white";
    }

    if(isInside(mousePos, decomposition)){
        decCol = "rgb(217, 219, 218)";
    }else{
        decCol = "white";
    }

    if(isInside(mousePos, sDisplace)){
        sDisCol = "rgb(217, 219, 218)";
    }else{
        sDisCol = "white";
    }

    if(isInside(mousePos, dDisplace)){
        dDisCol = "rgb(217, 219, 218)";
    }else{
        dDisCol = "white";
    }

    if(isInside(mousePos, cCombustion)){
        cComCol = "rgb(217, 219, 218)";
    }else{
        cComCol = "white";
    }

    if(isInside(mousePos, iCombustion)){
        iComCol = "rgb(217, 219, 218)";
    }else{
        iComCol = "white";
    }



}, false);

canvas.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if(sceneNo == 0){
        if(isInside(mousePos, synthesis)){
            sceneNo = 1;
        }

        else if(isInside(mousePos, decomposition)){
            sceneNo = 2;
        }

        else if(isInside(mousePos, sDisplace)){
            sceneNo = 3;
        }

        else if(isInside(mousePos, dDisplace)){
            sceneNo = 4;
        }

        else if(isInside(mousePos, cCombustion)){
            sceneNo = 5;
        }

        else if(isInside(mousePos, iCombustion)){
            sceneNo = 6;
        }
    }

}, false);


function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}


//6 objects to hold the 6 different animations
var synthesis = {
    x:112,
    y:250,
    width:250,
    height:125
};

var decomposition = {
    x:474,
    y:250,
    width:250,
    height:125
};

var sDisplace = {
    x:836,
    y:250,
    width:250,
    height:125
};

var dDisplace = {
    x:112,
    y:465,
    width:250,
    height:125
};

var cCombustion ={
    x:474,
    y:465,
    width:250,
    height:125
};

var iCombustion = {
    x:836,
    y:465,
    width:250,
    height:125
};



function draw(){
    if(sceneNo == 0){
        ctx.drawImage(bg1, 0, 0);
        ctx.fillStyle = "rgb(255, 255, 255, 0.6)";
        ctx.fillRect(0,0,width,height);

        ctx.font = "80px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Chemical Reactions Simulator", canvas.width/2, 125);
        
        ctx.font = "38px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        //drawing the buttons to move to different animation
        ctx.fillStyle = synCol;
        ctx.roundRect(synthesis.x,synthesis.y,synthesis.width,synthesis.height,10);
        ctx.fill();
        ctx.beginPath();

        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillText("Synthesis", synthesis.x+(synthesis.width/2), synthesis.y+(synthesis.height/2), synthesis.width);

        ctx.fillStyle = decCol;
        ctx.roundRect(decomposition.x,decomposition.y,decomposition.width,decomposition.height,10);
        ctx.fill();
        ctx.beginPath();

        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillText("Decomposition", decomposition.x+(decomposition.width/2), decomposition.y+(decomposition.height/2), decomposition.width);

        ctx.fillStyle = sDisCol;
        ctx.roundRect(sDisplace.x,sDisplace.y,sDisplace.width,sDisplace.height,10);
        ctx.fill();
        ctx.beginPath();

        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillText("Single", sDisplace.x+(sDisplace.width/2), sDisplace.y+(sDisplace.height/4)+10, sDisplace.width);
        ctx.fillText("Displacement", sDisplace.x+(sDisplace.width/2), sDisplace.y+(sDisplace.height/4*3)-10, sDisplace.width);

        ctx.fillStyle = dDisCol;
        ctx.roundRect(dDisplace.x,dDisplace.y,dDisplace.width,dDisplace.height,10);
        ctx.fill();
        ctx.beginPath();


        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillText("Double", dDisplace.x+(dDisplace.width/2), dDisplace.y+(dDisplace.height/4)+10, dDisplace.width);
        ctx.fillText("Displacement", dDisplace.x+(dDisplace.width/2), dDisplace.y+(dDisplace.height/4*3)-10, dDisplace.width);

        ctx.fillStyle = cComCol;
        ctx.roundRect(cCombustion.x,cCombustion.y,cCombustion.width,cCombustion.height,10);
        ctx.fill();
        ctx.beginPath();

        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillText("Complete", cCombustion.x+(cCombustion.width/2), cCombustion.y+(cCombustion.height/4)+10, cCombustion.width);
        ctx.fillText("Combustion", cCombustion.x+(cCombustion.width/2), cCombustion.y+(cCombustion.height/4*3)-10, cCombustion.width);

        ctx.fillStyle = iComCol;
        ctx.roundRect(iCombustion.x,iCombustion.y,iCombustion.width,iCombustion.height,10);
        ctx.fill();
        ctx.beginPath();

        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillText("Incomplete", iCombustion.x+(iCombustion.width/2), iCombustion.y+(iCombustion.height/4)+10, iCombustion.width);
        ctx.fillText("Combustion", iCombustion.x+(iCombustion.width/2), iCombustion.y+(iCombustion.height/4*3)-10, iCombustion.width);
    }
    else if(sceneNo == 1){
        ctx.drawImage(bg2, 0, 0);
        ctx.fillStyle = "rgb(255, 255, 255, 0.2)";
        ctx.fillRect(0,0,width,height);
    }
    else if(sceneNo == 2){
        ctx.drawImage(bg2, 0, 0);
        ctx.fillStyle = "rgb(255, 255, 255, 0.2)";
        ctx.fillRect(0,0,width,height);
    }
    else if(sceneNo == 3){
        ctx.drawImage(bg2, 0, 0);
        ctx.fillStyle = "rgb(255, 255, 255, 0.2)";
        ctx.fillRect(0,0,width,height);
    }
    else if(sceneNo == 4){
        ctx.drawImage(bg2, 0, 0);
        ctx.fillStyle = "rgb(255, 255, 255, 0.2)";
        ctx.fillRect(0,0,width,height);
        
    }
    else if(sceneNo == 5){
        ctx.drawImage(bg2, 0, 0);
        ctx.fillStyle = "rgb(255, 255, 255, 0.2)";
        ctx.fillRect(0,0,width,height);

    }
    else if(sceneNo == 6){
        ctx.drawImage(bg2, 0, 0);
        ctx.fillStyle = "rgb(255, 255, 255, 0.2)";
        ctx.fillRect(0,0,width,height);

    }

}

draw();

