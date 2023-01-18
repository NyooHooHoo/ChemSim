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


var sceneNo = 2;


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

            animate2 = false;
            hydrogenD1Copy.x = 200;
            hydrogenD1Copy.y = 280;
            hydrogenD2Copy.x = 320;
            hydrogenD2Copy.y = 280;
            hydrogenD3Copy.x = 200;
            hydrogenD3Copy.y = 500;
            hydrogenD4Copy.x = 320;
            hydrogenD4Copy.y = 500;
            oxygenD1Copy.x = 260;
            oxygenD1Copy.y = 320;
            oxygenD2Copy.x = 260;
            oxygenD2Copy.y = 460;

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
        if(isInside(mousePos, playButton)){
            animate1 = !animate1;
        }

    }
    else if(sceneNo == 2){
        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton)){
            animate2 = !animate2;
        }
    }
    else if(sceneNo == 3){
        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton)){
            animate3 = !animate3;
        }
    }
    else if(sceneNo == 4){
        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton)){
            animate4 = !animate4;
        }
    }
    else if(sceneNo == 5){
        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton)){
            animate5 = !animate5;
        }
    }
    else if(sceneNo == 6){
        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton)){
            animate6 = !animate6;
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


//Drawing Methods
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




//Classes
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


//Boolean Variables
var animate1 = false;
var animate2 = false;
var animate3 = false;
var animate4 = false;
var animate5 = false;
var animate6 = false;


//Synthesis Objects
let hydrogen1 = new Molecule(200, 350, 30, "H", "green");
let hydrogen2 = new Molecule(200, 410, 30, "H", "green");
let chlorine1 = new Molecule(400, 350, 30, "Cl", "blue");
let chlorine2 = new Molecule(400, 410, 30, "Cl", "blue");

let hydrogen1Copy = new Molecule(200, 350, 30, "H", "green");
let hydrogen2Copy = new Molecule(200, 410, 30, "H", "green");
let chlorine1Copy = new Molecule(400, 350, 30, "Cl", "blue");
let chlorine2Copy = new Molecule(400, 410, 30, "Cl", "blue");

//Decomposition Objects
let hydrogenD1 = new Molecule(200, 280, 30, "H", "rgb(52, 232, 235)");
let hydrogenD2 = new Molecule(320, 280, 30, "H", "rgb(52, 232, 235)");
let hydrogenD3 = new Molecule(200, 500, 30, "H", "rgb(52, 232, 235)");
let hydrogenD4 = new Molecule(320, 500, 30, "H", "rgb(52, 232, 235)");
let oxygenD1 = new Molecule(260, 320, 50, "O", "rgb(57, 67, 250)");
let oxygenD2 = new Molecule(260, 460, 50, "O", "rgb(57, 67, 250)");



let hydrogenD1Copy = new Molecule(200, 280, 30, "H", "rgb(52, 232, 235)");
let hydrogenD2Copy = new Molecule(320, 280, 30, "H", "rgb(52, 232, 235)");
let hydrogenD3Copy = new Molecule(200, 500, 30, "H", "rgb(52, 232, 235)");
let hydrogenD4Copy = new Molecule(320, 500, 30, "H", "rgb(52, 232, 235)");
let oxygenD1Copy = new Molecule(260, 320, 50, "O", "rgb(57, 67, 250)");
let oxygenD2Copy = new Molecule(260, 460, 50, "O", "rgb(57, 67, 250)");


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

        ctx.drawImage(plus, 275, 350);

        ctx.font = "60px ChalkFont";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Synthesis Reaction", canvas.width/2, 75);
          

        if(animate1){

            if(hydrogen1Copy.x == 800 && hydrogen1Copy.y == 332 && hydrogen2Copy.x == 800 && hydrogen2Copy.y == 428){
                if(chlorine1Copy.y > 250 && chlorine1Copy.x < 830){
                    chlorine1Copy.moveUp();
                }
                else if(chlorine1Copy.x < 858){
                    chlorine1Copy.moveRight();
                }
                else if(chlorine1Copy.y < 330){
                    chlorine1Copy.moveDown();
                }

                if(chlorine2Copy.y < 510 && chlorine2Copy.x < 830){
                    chlorine2Copy.moveDown();
                }
                else if(chlorine2Copy.x < 858){
                    chlorine2Copy.moveRight();
                }
                else if(chlorine2Copy.y > 430){
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
                else if(hydrogen1Copy.y < 330){
                    hydrogen1Copy.moveDown();
                }

                if(hydrogen2Copy.y < 560 && hydrogen2Copy.x != 800){
                    hydrogen2Copy.moveDown();
                }
                else if(hydrogen2Copy.x < 800){
                    hydrogen2Copy.moveRight();
                }
                else if(hydrogen2Copy.y > 430){
                    hydrogen2Copy.moveUp();
                }
                chlorine1Copy.draw();
                chlorine2Copy.draw();
            }

            if(hydrogen1Copy.x == 800 && hydrogen1Copy.y >= 330){
                hydrogen1Copy.draw();
            }
            if(hydrogen2Copy.x == 800 && hydrogen2Copy.y <= 430){
                hydrogen2Copy.draw();
            }
            if(chlorine1Copy.y >= 330 && chlorine1Copy.x == 859){
                chlorine1Copy.draw();
            }
            if(chlorine2Copy.y <= 430 && chlorine2Copy.x == 859){
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
        drawSim(animate2);
        ctx.font = "50px ChalkFont";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Decomposition Reaction", canvas.width/2, 75);

        ctx.drawImage(plus, 875, 360);

        if(animate2){
            if(hydrogenD1Copy.x == 1001 && hydrogenD1Copy.y == 340 && hydrogenD2Copy.x == 1061 && hydrogenD2Copy.y == 340 && hydrogenD3Copy.x == 1001 && hydrogenD3Copy.y == 440 && hydrogenD4Copy.x == 1061 && hydrogenD4Copy.y == 440){
                    if(oxygenD1Copy.y > 170 && oxygenD1Copy.x < 780){
                        oxygenD1Copy.moveUp();
                    }
                    else if(oxygenD1Copy.y <= 170 && oxygenD1Copy.x < 780){
                        oxygenD1Copy.moveRight();
                    }
                    else if(oxygenD1Copy.y < 340 && oxygenD1Copy.x >= 780){
                        oxygenD1Copy.moveDown();
                    }

                    if(oxygenD2Copy.y < 610 && oxygenD2Copy.x < 780){
                        oxygenD2Copy.moveDown();
                    }
                    else if(oxygenD2Copy.y >= 610 && oxygenD2Copy.x < 780){
                        oxygenD2Copy.moveRight();
                    }
                    else if(oxygenD2Copy.y > 440 && oxygenD2Copy.x >= 780){
                        oxygenD2Copy.moveUp();
                    }
            }
            else{
                if(hydrogenD1Copy.y > 180 && hydrogenD1Copy.x < 1000){
                    hydrogenD1Copy.moveUp();
                }
                else if(hydrogenD1Copy.y <= 180 && hydrogenD1Copy.x < 1000){
                    hydrogenD1Copy.moveRight();
                }
                else if(hydrogenD1Copy.y < 340 && hydrogenD1Copy.x >= 1000){
                    hydrogenD1Copy.moveDown();
                }

                if(hydrogenD2Copy.y > 180 && hydrogenD2Copy.x < 1060){
                    hydrogenD2Copy.moveUp();
                }
                else if(hydrogenD2Copy.y <= 180 && hydrogenD2Copy.x < 1060){
                    hydrogenD2Copy.moveRight();
                }
                else if(hydrogenD2Copy.y < 340 && hydrogenD2Copy.x >= 1060){
                    hydrogenD2Copy.moveDown();
                }

                if(hydrogenD3Copy.y < 600 && hydrogenD3Copy.x < 1000){
                    hydrogenD3Copy.moveDown();
                }
                else if(hydrogenD3Copy.y >= 600 && hydrogenD3Copy.x < 1000){
                    hydrogenD3Copy.moveRight();
                }
                else if(hydrogenD3Copy.y > 440 && hydrogenD3Copy.x >= 1000){
                    hydrogenD3Copy.moveUp();
                }

                if(hydrogenD4Copy.y < 600 && hydrogenD4Copy.x < 1060){
                    hydrogenD4Copy.moveDown();
                }
                else if(hydrogenD4Copy.y >= 600 && hydrogenD4Copy.x < 1060){
                    hydrogenD4Copy.moveRight();
                }
                else if(hydrogenD4Copy.y > 440 && hydrogenD4Copy.x >= 1060){
                    hydrogenD4Copy.moveUp();
                }
            }

            if(hydrogenD1Copy.x == 1001 && hydrogenD1Copy.y == 340) hydrogenD1Copy.draw();
            if(hydrogenD2Copy.x == 1061 && hydrogenD2Copy.y == 340) hydrogenD2Copy.draw();
            if(hydrogenD3Copy.x == 1001 && hydrogenD3Copy.y == 440) hydrogenD3Copy.draw();
            if(hydrogenD4Copy.x == 1061 && hydrogenD4Copy.y == 440) hydrogenD4Copy.draw();
            if(oxygenD1Copy.x >= 780 && oxygenD1Copy.y >= 340) oxygenD1Copy.draw();
            if(oxygenD2Copy.x >= 780 && oxygenD2Copy.y <= 440) oxygenD2Copy.draw();

            hydrogenD1.draw();
            hydrogenD2.draw();
            hydrogenD3.draw();
            hydrogenD4.draw();
            oxygenD1.draw();
            oxygenD2.draw();
        }
        else{
            hydrogenD1.draw();
            hydrogenD2.draw();
            hydrogenD3.draw();
            hydrogenD4.draw();
            oxygenD1.draw();
            oxygenD2.draw();

            hydrogenD1Copy.draw();
            hydrogenD2Copy.draw();
            hydrogenD3Copy.draw();
            hydrogenD4Copy.draw();
            oxygenD1Copy.draw();
            oxygenD2Copy.draw();
        }

    }
    else if(sceneNo == 3){
        drawSim(animate3);
    }
    else if(sceneNo == 4){
        drawSim(animate4);
        
    }
    else if(sceneNo == 5){
        drawSim(animate5);

    }
    else if(sceneNo == 6){
        drawSim(animate6);

    }

}

animate();
