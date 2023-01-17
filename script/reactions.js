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


var sceneNo = 1;

var animate1 = false;

//initializing all images
var bg1 = new Image();
bg1.src = "assets/chemBG.png";

var bg2 = new Image();
bg2.src = "assets/labBG.jpg";

var play = new Image();
play.src = "assets/play.png"

var back = new Image();
back.src = "assets/backarrow.png"

var pause = new Image();
pause.src = "assets/pause.png"

var plus = new Image();
plus.src = "assets/plus.png"

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

    if(sceneNo == 0){
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
    }


}, false);

canvas.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if(sceneNo == 0){
        if(isInside(mousePos, synthesis)){
            sceneNo = 1;
            animate1 = false;
            //resetting circle locations
            hydrogen1.x = 200;
            hydrogen1.y = 350;
            hydrogen2.x = 200;
            hydrogen2.y = 410;
            chlorine1.x = 400;
            chlorine1.y = 350;
            chlorine2.x = 400;
            chlorine2.y = 410;
            hydrogen1Copy.x = 200;
            hydrogen1Copy.y = 350;
            hydrogen2Copy.x = 200;
            hydrogen2Copy.y = 410;
            chlorine1Copy.x = 400;
            chlorine1Copy.y = 350;
            chlorine2Copy.x = 400;
            chlorine2Copy.y = 410;

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
    else if(sceneNo == 1){

        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate1 == false){
            animate1 = true;
        }
        else if(isInside(mousePos, playButton) && animate1 == true){
            animate1 = false;
        }
    }
    else if(sceneNo == 2){
        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate1 == false){
            animate1 = true;
        }
        else if(isInside(mousePos, playButton) && animate1 == true){
            animate1 = false;
        }
    }
    else if(sceneNo == 3){
        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate1 == false){
            animate1 = true;
        }
        else if(isInside(mousePos, playButton) && animate1 == true){
            animate1 = false;
        }
    }

}, false);


function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}


var playButton = {
    x:1050,
    y:25,
    width:100,
    height:100
};

var backButton = {
    x:50,
    y:25,
    width:100,
    height:100
};

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

function drawBox(rect, col, name1, name2, type){
    ctx.fillStyle = col;
    ctx.roundRect(rect.x,rect.y,rect.width,rect.height,10);
    ctx.fill();
    ctx.beginPath();

    if(type == 1){
        ctx.fillStyle = "black";
        ctx.fillText(name1, rect.x+(rect.width/2), rect.y+(rect.height/2), rect.width);
    }
    else{
        ctx.fillStyle = "black";
        ctx.fillText(name1, rect.x+(rect.width/2), rect.y+(rect.height/4)+10, rect.width);
        ctx.fillText(name2, rect.x+(rect.width/2), rect.y+(rect.height/4*3)-10, rect.width);
    }
    ctx.closePath();

}

function drawBg(){
    ctx.drawImage(bg1, 0, 0);
    ctx.fillStyle = "rgb(255, 255, 255, 0.6)";
    ctx.fillRect(0,0,width,height);
}

function drawSim(animate){
    ctx.drawImage(bg2, 0, 0);
    ctx.fillStyle = "rgb(255, 255, 255, 0.6)";
    ctx.fillRect(0,0,width,height);

    if(animate){
        ctx.drawImage(pause, playButton.x, playButton.y);
    }
    else{
        ctx.drawImage(play, playButton.x, playButton.y);
    }
    
    ctx.drawImage(back, backButton.x, backButton.y);
}


class Molecule{
    constructor(x, y, radius, name, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = "white";
        this.speed = 3;
        this.name = name;
        this.col = color;
    }

    draw(){
        //ctx.beginPath();
        ctx.fillStyle = this.col;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.font = "38px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.name, this.x, this.y);

    }

    moveUp(){
        this.draw();
        this.y -= this.speed;        
    }
    moveDown(){
        this.draw();
        this.y+=this.speed;
    }
    moveRight(){
        this.draw();
        this.x += this.speed;
    }
    moveLeft(){
        this.draw();
        this.x -= this.speed; 
    }
}


var circle = {
    centerX:250, 
    centerY:250, 
    radius:125, 
    angle:0
}



//Synthesis Objects
let hydrogen1 = new Molecule(200, 350, 30, "H", "green");
let hydrogen2 = new Molecule(200, 410, 30, "H", "green");
let chlorine1 = new Molecule(400, 350, 30, "Cl", "blue");
let chlorine2 = new Molecule(400, 410, 30, "Cl", "blue");

let hydrogen1Copy = new Molecule(200, 350, 30, "H", "green");
let hydrogen2Copy = new Molecule(200, 410, 30, "H", "green");
let chlorine1Copy = new Molecule(400, 350, 30, "Cl", "blue");
let chlorine2Copy = new Molecule(400, 410, 30, "Cl", "blue");

function animate(){
    window.requestAnimationFrame(animate);

    if(sceneNo == 0){
        drawBg();

        ctx.font = "80px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Chemical Reactions Simulator", canvas.width/2, 125);
        
        ctx.font = "38px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        //drawing the buttons to move to different animation
        drawBox(synthesis, synCol, "Synthesis", "", 1);
        drawBox(decomposition, decCol, "Decomposition", "", 1)
        drawBox(sDisplace, sDisCol, "Single", "Displacement", 2);
        drawBox(dDisplace, dDisCol, "Double", "Displacement", 2);
        drawBox(cCombustion, cComCol, "Complete", "Combustion", 2);
        drawBox(iCombustion, iComCol, "Incomplete", "Combustion", 2);


    }
    else if(sceneNo == 1){
        ctx.fillStyle = "black";
        drawSim(animate1);

        ctx.drawImage(plus, 275, 350)

        ctx.font = "60px ChalkFont";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Synthesis Reaction", canvas.width/2, 75);
          

        if(animate1){

            if(hydrogen1Copy.x == 800 && hydrogen1Copy.y == 350 && hydrogen2Copy.x == 800 && hydrogen2Copy.y == 410){
                if(chlorine1Copy.y > 270 && chlorine1Copy.x < 830){
                    chlorine1Copy.moveUp();
                }
                else if(chlorine1Copy.x < 858){
                    chlorine1Copy.moveRight();
                }
                else if(chlorine1Copy.y < 350){
                    chlorine1Copy.moveDown();
                }

                if(chlorine2Copy.y < 490 && chlorine2Copy.x < 830){
                    chlorine2Copy.moveDown();
                }
                else if(chlorine2Copy.x < 858){
                    chlorine2Copy.moveRight();
                }
                else if(chlorine2Copy.y > 410){
                    chlorine2Copy.moveUp();
                }
            }
            else{
                if(hydrogen1Copy.y > 200 && hydrogen1Copy.x != 800){
                    hydrogen1Copy.moveUp();
                }
                else if(hydrogen1Copy.x < 800){
                    hydrogen1Copy.moveRight();
                }
                else if(hydrogen1Copy.y < 350){
                    hydrogen1Copy.moveDown();
                }

                if(hydrogen2Copy.y < 560 && hydrogen2Copy.x != 800){
                    hydrogen2Copy.moveDown();
                }
                else if(hydrogen2Copy.x < 800){
                    hydrogen2Copy.moveRight();
                }
                else if(hydrogen2Copy.y > 410){
                    hydrogen2Copy.moveUp();
                }
                chlorine1Copy.draw();
                chlorine2Copy.draw();
            }

            if(hydrogen1Copy.x == 800 && hydrogen1Copy.y == 350){
                hydrogen1Copy.draw();
            }
            if(hydrogen2Copy.x == 800 && hydrogen2Copy.y == 410){
                hydrogen2Copy.draw();
            }
            if(chlorine1Copy.y == 350 && chlorine1Copy.x == 859){
                chlorine1Copy.draw();
            }
            if(chlorine2Copy.y == 410 && chlorine2Copy.x == 859){
                chlorine2Copy.draw();
            }        
            hydrogen1.draw();
            hydrogen2.draw(); 
            chlorine1.draw();
            chlorine2.draw();
        }
        else{
            hydrogen1.draw();
            hydrogen2.draw(); 
            chlorine1.draw();
            chlorine2.draw();
            hydrogen1Copy.draw();
            hydrogen2Copy.draw();   
            chlorine1Copy.draw();
            chlorine2Copy.draw(); 
        }    

    }
    else if(sceneNo == 2){
        drawSim(animate1);
    }
    else if(sceneNo == 3){
        drawSim(animate1);
    }
    else if(sceneNo == 4){
        drawBg(bg2);
        
    }
    else if(sceneNo == 5){
        drawBg(bg2);

    }
    else if(sceneNo == 6){
        drawBg(bg2);

    }

}

animate();
