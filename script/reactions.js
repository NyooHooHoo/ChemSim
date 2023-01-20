var canvas = document.getElementById("reaction-simulation");
if (canvas.getContext) var ctx = canvas.getContext("2d"); else alert("Canvas element is not available");

var width = canvas.width;
var height = canvas.height;

var synCol = "white";
var decCol = "white";
var sDisCol = "white";
var dDisCol = "white";
var comCol = "white";
var acidCol = "white";


var sceneNo = 5;


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

var replay = new Image();
replay.src = "assets/replay.png"

var arrow = new Image();
arrow.src = "assets/arrow.png"

var arrowSmall = new Image();
arrowSmall.src = "assets/arrow2.png"

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

        if(isInside(mousePos, combustion)){
            comCol = "rgb(217, 219, 218)";
        }else{
            comCol = "white";
        }

        if(isInside(mousePos, acidBase)){
            acidCol = "rgb(217, 219, 218)";
        }else{
            acidCol = "white";
        }
    }


}, false);

canvas.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if(sceneNo == 0){
        if(isInside(mousePos, synthesis)){
            sceneNo = 1;
            animate1 = 0;

            //resetting circle locations
            hydrogenS1Copy.x = 200;
            hydrogenS1Copy.y = 340;
            hydrogenS2Copy.x = 200;
            hydrogenS2Copy.y = 460;
            chlorineS1Copy.x = 450;
            chlorineS1Copy.y = 350;
            chlorineS2Copy.x = 450;
            chlorineS2Copy.y = 450;

        }

        else if(isInside(mousePos, decomposition)){
            sceneNo = 2;
            animate2 = 0;

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
            animate3 = 0;

            sodiumSDCopy.x = 100;
            sodiumSDCopy.y = 380;
            chlorineSDCopy.x = 200;
            chlorineSDCopy.y = 380;
            potassiumSDCopy.x = 440;
            potassiumSDCopy.y = 380;
        }

        else if(isInside(mousePos, dDisplace)){
            sceneNo = 4;
            animate4 = 0;

            magnesiumDDCopy.x = 80;
            magnesiumDDCopy.y = 380;
            oxygenDDCopy.x = 160;
            oxygenDDCopy.y = 380;
            calciumDDCopy.x = 340;
            calciumDDCopy.y = 380;
            sulfurDDCopy.x = 430;
            sulfurDDCopy.y = 380;
        }

        else if(isInside(mousePos, combustion)){
            sceneNo = 5;
        }

        else if(isInside(mousePos, acidBase)){
            sceneNo = 6;
        }
    }
    else if(sceneNo == 1){

        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate1 == 0){
            animate1 = 1;
        }
        else if(isInside(mousePos, playButton) && animate1 == 1){
            animate1 = 0;
        }
        else if(isInside(mousePos, playButton) && animate1 == 2){
            hydrogenS1Copy.x = 200;
            hydrogenS1Copy.y = 340;
            hydrogenS2Copy.x = 200;
            hydrogenS2Copy.y = 460;
            chlorineS1Copy.x = 450;
            chlorineS1Copy.y = 350;
            chlorineS2Copy.x = 450;
            chlorineS2Copy.y = 450;

            animate1 = 0;
        }

    }
    else if(sceneNo == 2){
        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate2 == 0){
            animate2 = 1;
        }
        else if(isInside(mousePos, playButton) && animate2 == 1){
            animate2 = 0;
        }
        else if(isInside(mousePos, playButton) && animate2 == 2){
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

            animate2 = 0;
        }

    }
    else if(sceneNo == 3){
        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate3 == 0){
            animate3 = 1;
        }
        else if(isInside(mousePos, playButton) && animate3 == 1){
            animate3 = 0;
        }
        else if(isInside(mousePos, playButton) && animate3 == 2){
            sodiumSDCopy.x = 100;
            sodiumSDCopy.y = 380;
            chlorineSDCopy.x = 200;
            chlorineSDCopy.y = 380;
            potassiumSDCopy.x = 440;
            potassiumSDCopy.y = 380;

            animate3 = 0;
        }
    }
    else if(sceneNo == 4){
        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate4 == 0){
            animate4 = 1;
        }
        else if(isInside(mousePos, playButton) && animate4 == 1){
            animate4 = 0;
        }
        else if(isInside(mousePos, playButton) && animate4 == 2){
            magnesiumDDCopy.x = 80;
            magnesiumDDCopy.y = 380;
            oxygenDDCopy.x = 160;
            oxygenDDCopy.y = 380;
            calciumDDCopy.x = 340;
            calciumDDCopy.y = 380;
            sulfurDDCopy.x = 430;
            sulfurDDCopy.y = 380;

            animate4 = 0;
        }
    }
    else if(sceneNo == 5){
        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate5 == 0){
            animate5 = 1;
        }
        else if(isInside(mousePos, playButton) && animate5 == 1){
            animate5 = 0;
        }
        else if(isInside(mousePos, playButton) && animate5 == 2){
            animate5 = 0;
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

var combustion ={
    x:474,
    y:465,
    width:250,
    height:125
};

var acidBase = {
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

    if(animate == 1){
        ctx.drawImage(pause, playButton.x, playButton.y);
    }
    else if(animate == 0){
        ctx.drawImage(play, playButton.x, playButton.y);
    }
    else{
        ctx.drawImage(replay, playButton.x, playButton.y);
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
        this.speed = 5;
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
var animate1 = 0;
var animate2 = 0;
var animate3 = 0;
var animate4 = 0;
var animate5 = 0;
var animate6 = 0;


//Synthesis Objects
let hydrogenS1 = new Molecule(200, 340, 60, "H", "green");
let hydrogenS2 = new Molecule(200, 460, 60, "H", "green");
let chlorineS1 = new Molecule(450, 350, 50, "Cl", "blue");
let chlorineS2 = new Molecule(450, 450, 50, "Cl", "blue");

let hydrogenS1Copy = new Molecule(200, 340, 60, "H", "green");
let hydrogenS2Copy = new Molecule(200, 460, 60, "H", "green");
let chlorineS1Copy = new Molecule(450, 350, 50, "Cl", "blue");
let chlorineS2Copy = new Molecule(450, 450, 50, "Cl", "blue");

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

//Single Displacement Objects
let sodiumSD = new Molecule(100, 380, 40, "Na", "rgb(117, 147, 255)");
let chlorineSD = new Molecule(200, 380, 60, "Cl", "rgb(255, 110, 209)");
let potassiumSD = new Molecule(440, 380, 50, "K", "rgb(255, 248, 117)");

let sodiumSDCopy = new Molecule(100, 380, 40, "Na", "rgb(117, 147, 255)");
let chlorineSDCopy = new Molecule(200, 380, 60, "Cl", "rgb(255, 110, 209)");
let potassiumSDCopy = new Molecule(440, 380, 50, "K", "rgb(255, 248, 117)");

//Double Displacement Objects
let magnesiumDD = new Molecule(80, 380, 50, "Mg", "rgb(255, 192, 110)");
let oxygenDD = new Molecule(160, 380, 30, "O", "rgb(239, 99, 255)");
let calciumDD = new Molecule(340, 380, 50, "Ca", "rgb(199, 255, 94)");
let sulfurDD = new Molecule(430, 380, 40, "S", "rgb(250, 136, 70)");

let magnesiumDDCopy = new Molecule(80, 380, 50, "Mg", "rgb(255, 192, 110)");
let oxygenDDCopy = new Molecule(160, 380, 30, "O", "rgb(239, 99, 255)");
let calciumDDCopy = new Molecule(340, 380, 50, "Ca", "rgb(199, 255, 94)");
let sulfurDDCopy = new Molecule(430, 380, 40, "S", "rgb(250, 136, 70)");


//Combustion Objects
let carbonC = new Molecule(140, 380, 50, "C", "rgb(255, 192, 110)");
let hydrogenC1 = new Molecule(80, 330, 30, "H", "rgb(255, 251, 138)");
let hydrogenC2 = new Molecule(200, 330, 30, "H", "rgb(255, 251, 138)");
let hydrogenC3 = new Molecule(80, 430, 30, "H", "rgb(255, 251, 138)");
let hydrogenC4 = new Molecule(200, 430, 30, "H", "rgb(255, 251, 138)");
let oxygenC1 = new Molecule(360, 330, 35, "O", "rgb(138, 204, 255)");
let oxygenC2 = new Molecule(430, 330, 35, "O", "rgb(138, 204, 255)");
let oxygenC3 = new Molecule(360, 430, 35, "O", "rgb(138, 204, 255)");
let oxygenC4 = new Molecule(430, 430, 35, "O", "rgb(138, 204, 255)");

let carbonCCopy = new Molecule(750, 380, 50, "C", "rgb(255, 192, 110)");
let hydrogenC1Copy = new Molecule(980, 315, 30, "H", "rgb(255, 251, 138)");
let hydrogenC2Copy = new Molecule(1100, 315, 30, "H", "rgb(255, 251, 138)");
let hydrogenC3Copy = new Molecule(980, 445, 30, "H", "rgb(255, 251, 138)");
let hydrogenC4Copy = new Molecule(1100, 445, 30, "H", "rgb(255, 251, 138)");
let oxygenC1Copy = new Molecule(750, 295, 35, "O", "rgb(138, 204, 255)");
let oxygenC2Copy = new Molecule(980, 380, 35, "O", "rgb(138, 204, 255)");
let oxygenC3Copy = new Molecule(750, 465, 35, "O", "rgb(138, 204, 255)");
let oxygenC4Copy = new Molecule(1100, 380, 35, "O", "rgb(138, 204, 255)");


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
        drawBox(combustion, comCol, "Combustion", "", 1);
        drawBox(acidBase, acidCol, "Acid Base", "Reaction", 2);


    }
    else if(sceneNo == 1){
        ctx.fillStyle = "black";
        drawSim(animate1);

        ctx.drawImage(plus, 300, 370);

        ctx.font = "60px ChalkFont";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Synthesis Reaction", canvas.width/2, 75);
        ctx.drawImage(arrow, 560, 330);

        if(animate1){

            if(hydrogenS1Copy.x >= 870 && hydrogenS1Copy.y >= 320 && hydrogenS2Copy.x >= 870 && hydrogenS2Copy.y <= 480){
                if(chlorineS1Copy.y > 200 && chlorineS1Copy.x < 980){
                    chlorineS1Copy.moveUp();
                }
                else if(chlorineS1Copy.y <= 200 && chlorineS1Copy.x < 980){
                    chlorineS1Copy.moveRight();
                }
                else if(chlorineS1Copy.y < 320 && chlorineS1Copy.x >= 980){
                    chlorineS1Copy.moveDown();
                }

                if(chlorineS2Copy.y < 600 && chlorineS2Copy.x < 980){
                    chlorineS2Copy.moveDown();
                }
                else if(chlorineS2Copy.y >= 600 && chlorineS2Copy.x < 980){
                    chlorineS2Copy.moveRight();
                }
                else if(chlorineS2Copy.y > 480 && chlorineS2Copy.x >= 980){
                    chlorineS2Copy.moveUp();
                }
            }
            else{
                if(hydrogenS1Copy.y > 200 && hydrogenS1Copy.x < 870){
                    hydrogenS1Copy.moveUp();
                }
                else if(hydrogenS1Copy.y <= 200 && hydrogenS1Copy.x < 870){
                    hydrogenS1Copy.moveRight();
                }
                else if(hydrogenS1Copy.y < 320 && hydrogenS1Copy.x >= 870){
                    hydrogenS1Copy.moveDown();
                }

                if(hydrogenS2Copy.y < 600 && hydrogenS2Copy.x < 870){
                    hydrogenS2Copy.moveDown();
                }
                else if(hydrogenS2Copy.y >= 600 && hydrogenS2Copy.x < 870){
                    hydrogenS2Copy.moveRight();
                }
                else if(hydrogenS2Copy.y > 480 && hydrogenS2Copy.x >= 870){
                    hydrogenS2Copy.moveUp();
                }

            }
            if(hydrogenS1Copy.x >= 870 && hydrogenS1Copy.y >= 320) hydrogenS1Copy.draw();//up
            if(chlorineS1Copy.x >= 980 && chlorineS1Copy.y >= 320) chlorineS1Copy.draw();
            if(hydrogenS2Copy.x >= 870 && hydrogenS2Copy.y <= 480) hydrogenS2Copy.draw();//down
            if(chlorineS2Copy.x >= 980 && chlorineS2Copy.y <= 480) chlorineS2Copy.draw();

            hydrogenS1.draw();
            hydrogenS2.draw(); 
            chlorineS1.draw();
            chlorineS2.draw();
        }
        else{
            hydrogenS1.draw();
            hydrogenS2.draw(); 
            chlorineS1.draw();
            chlorineS2.draw();
            hydrogenS1Copy.draw();
            hydrogenS2Copy.draw();   
            chlorineS1Copy.draw();
            chlorineS2Copy.draw(); 
        }

        if(hydrogenS1Copy.x >= 870 && hydrogenS1Copy.y >= 320 && chlorineS1Copy.x >= 980 && chlorineS1Copy.y >= 320 && hydrogenS2Copy.x >= 870 && hydrogenS2Copy.y <= 480 && chlorineS2Copy.x >= 980 && chlorineS2Copy.y <= 480) animate1=2;

    }
    else if(sceneNo == 2){
        drawSim(animate2);
        ctx.font = "50px ChalkFont";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Decomposition Reaction", canvas.width/2, 75);
        
        ctx.drawImage(arrow, 450, 310);
        ctx.drawImage(plus, 875, 360);

        if(animate2 == 1){
            if(hydrogenD1Copy.x >= 1000 && hydrogenD1Copy.y >= 340 && hydrogenD2Copy.x >= 1060 && hydrogenD2Copy.y >= 340 && hydrogenD3Copy.x >= 1000 && hydrogenD3Copy.y <= 440 && hydrogenD4Copy.x >= 1060 && hydrogenD4Copy.y <= 440){
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

            if(hydrogenD1Copy.x >= 1000 && hydrogenD1Copy.y >= 340) hydrogenD1Copy.draw();
            if(hydrogenD2Copy.x >= 1060 && hydrogenD2Copy.y >= 340) hydrogenD2Copy.draw();
            if(hydrogenD3Copy.x >= 1000 && hydrogenD3Copy.y <= 440) hydrogenD3Copy.draw();
            if(hydrogenD4Copy.x >= 1060 && hydrogenD4Copy.y <= 440) hydrogenD4Copy.draw();
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

        if(hydrogenD1Copy.x >= 1000 && hydrogenD1Copy.y >= 340 && hydrogenD2Copy.x >= 1060 && hydrogenD2Copy.y >= 340 && hydrogenD3Copy.x >= 1000 && hydrogenD3Copy.y <= 440 && hydrogenD4Copy.x >= 1060 && hydrogenD4Copy.y <= 440 && oxygenD1Copy.x >= 780 && oxygenD1Copy.y >= 340 && oxygenD2Copy.x >= 780 && oxygenD2Copy.y <= 440) animate2 = 2;

    }
    else if(sceneNo == 3){
        drawSim(animate3);
        ctx.font = "50px ChalkFont";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Single Displacement", canvas.width/2, 75);

        ctx.drawImage(arrowSmall, 570, 330);
        ctx.drawImage(plus, 300, 360);
        ctx.drawImage(plus, 1000, 360);

        if(animate3 == 1){          
            if(chlorineSDCopy.y >= 380 && chlorineSDCopy.x >= 900){

                if(sodiumSDCopy.y > 220 && sodiumSDCopy.x < 1125){
                    sodiumSDCopy.moveUp();
                }
                else if(sodiumSDCopy.y <= 220 && sodiumSDCopy.x < 1125){
                    sodiumSDCopy.moveRight();
                }
                else if(sodiumSDCopy.y < 380 && sodiumSDCopy.x >= 1125){
                    sodiumSDCopy.moveDown();
                }

                if(potassiumSDCopy.y < 540 && potassiumSDCopy.x < 790){
                    potassiumSDCopy.moveDown();
                }
                else if(potassiumSDCopy.y >= 540 && potassiumSDCopy.x < 790){
                    potassiumSDCopy.moveRight();
                }
                else if(potassiumSDCopy.y > 380 && potassiumSDCopy.x >= 790){
                    potassiumSDCopy.moveUp();
                }

            }
            else{
                if(chlorineSDCopy.y > 220 && chlorineSDCopy.x < 900){
                    chlorineSDCopy.moveUp();
                }
                else if(chlorineSDCopy.y <= 220 && chlorineSDCopy.x < 900){
                    chlorineSDCopy.moveRight();
                }
                else if(chlorineSDCopy.y < 380 && chlorineSDCopy.x >= 900){
                    chlorineSDCopy.moveDown();
                }
            }

            if(chlorineSDCopy.y >= 380 && chlorineSDCopy.x >= 900) chlorineSDCopy.draw();
            if(potassiumSDCopy.y <= 380 && potassiumSDCopy.x >= 790) potassiumSDCopy.draw();
            if(sodiumSDCopy.y >= 380 && sodiumSDCopy.x >= 1125) sodiumSDCopy.draw();

            potassiumSD.draw();
            sodiumSD.draw(); 
            chlorineSD.draw();

        }
        else{
            potassiumSD.draw();
            sodiumSD.draw(); 
            chlorineSD.draw();
            potassiumSDCopy.draw();
            chlorineSDCopy.draw();
            sodiumSDCopy.draw(); 
        }

        if(chlorineSDCopy.y >= 380 && chlorineSDCopy.x >= 900 && potassiumSDCopy.y <= 380 && potassiumSDCopy.x >= 790 && sodiumSDCopy.y >= 380 && sodiumSDCopy.x >= 1125) animate3 = 2;

    }
    else if(sceneNo == 4){
        drawSim(animate4);
        ctx.font = "50px ChalkFont";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Double Displacement", canvas.width/2, 75);

        ctx.drawImage(arrowSmall, 550, 330);
        ctx.drawImage(plus, 220, 360);
        ctx.drawImage(plus, 935, 360);

        if(animate4 == 1){
            if(calciumDDCopy.y <= 380 && calciumDDCopy.x >= 1050 && magnesiumDDCopy.y >= 380 && magnesiumDDCopy.x >= 790){

                if(sulfurDDCopy.y > 220 && sulfurDDCopy.x < 880){
                    sulfurDDCopy.moveUp();
                }
                else if(sulfurDDCopy.y <= 220 && sulfurDDCopy.x < 880){
                    sulfurDDCopy.moveRight();
                }
                else if(sulfurDDCopy.y < 380 && sulfurDDCopy.x >= 880){
                    sulfurDDCopy.moveDown();
                }

                if(oxygenDDCopy.y < 540 && oxygenDDCopy.x < 1130){
                    oxygenDDCopy.moveDown();
                }
                else if(oxygenDDCopy.y >= 540 && oxygenDDCopy.x < 1130){
                    oxygenDDCopy.moveRight();
                }
                else if(oxygenDDCopy.y > 380 && oxygenDDCopy.x >= 1130){
                    oxygenDDCopy.moveUp();
                }

            }
            else{

                if(magnesiumDDCopy.y > 220 && magnesiumDDCopy.x < 790){
                    magnesiumDDCopy.moveUp();
                }
                else if(magnesiumDDCopy.y <= 220 && magnesiumDDCopy.x < 790){
                    magnesiumDDCopy.moveRight();
                }
                else if(magnesiumDDCopy.y < 380 && magnesiumDDCopy.x >= 790){
                    magnesiumDDCopy.moveDown();
                }

                if(calciumDDCopy.y < 540 && calciumDDCopy.x < 1050){
                    calciumDDCopy.moveDown();
                }
                else if(calciumDDCopy.y >= 540 && calciumDDCopy.x < 1050){
                    calciumDDCopy.moveRight();
                }
                else if(calciumDDCopy.y > 380 && calciumDDCopy.x >= 1050){
                    calciumDDCopy.moveUp();
                }

            }

            if(oxygenDDCopy.y <= 380 && oxygenDDCopy.x >= 1130) oxygenDDCopy.draw();
            if(calciumDDCopy.y <= 380 && calciumDDCopy.x >= 1050) calciumDDCopy.draw();
            if(magnesiumDDCopy.y >= 380 && magnesiumDDCopy.x >= 790) magnesiumDDCopy.draw();
            if(sulfurDDCopy.y >= 380 && sulfurDDCopy.x >= 880) sulfurDDCopy.draw();        

            magnesiumDD.draw();
            oxygenDD.draw();
            calciumDD.draw();
            sulfurDD.draw();
        }
        else{
            magnesiumDD.draw();
            oxygenDD.draw();
            calciumDD.draw();
            sulfurDD.draw();
            magnesiumDDCopy.draw();
            oxygenDDCopy.draw();
            calciumDDCopy.draw();
            sulfurDDCopy.draw();
        }

        if(oxygenDDCopy.y <= 380 && oxygenDDCopy.x >= 1130 && calciumDDCopy.y <= 380 && calciumDDCopy.x >= 1050 && magnesiumDDCopy.y >= 380 && magnesiumDDCopy.x >= 790 && sulfurDDCopy.y >= 380 && sulfurDDCopy.x >= 880) animate4 = 2;
    }
    else if(sceneNo == 5){
        drawSim(animate5);
        ctx.font = "50px ChalkFont";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Combustion Reaction", canvas.width/2, 75);

        ctx.drawImage(arrowSmall, 510, 330);
        ctx.drawImage(plus, 250, 360);
        ctx.drawImage(plus, 850, 360);

        if(animate5 == 1){

        }
        else{
            carbonC.draw();
            hydrogenC1.draw();
            hydrogenC2.draw();
            hydrogenC3.draw();
            hydrogenC4.draw();
            oxygenC1.draw();
            oxygenC2.draw();
            oxygenC3.draw();
            oxygenC4.draw();

            carbonCCopy.draw();
            hydrogenC1Copy.draw();
            hydrogenC2Copy.draw();
            hydrogenC3Copy.draw();
            hydrogenC4Copy.draw();
            oxygenC1Copy.draw();
            oxygenC2Copy.draw();
            oxygenC3Copy.draw();
            oxygenC4Copy.draw();
        }

        carbonC.draw();
        hydrogenC1.draw();
        hydrogenC2.draw();
        hydrogenC3.draw();
        hydrogenC4.draw();
        oxygenC1.draw();
        oxygenC2.draw();
        oxygenC3.draw();
        oxygenC4.draw();

        carbonCCopy.draw();
        hydrogenC1Copy.draw();
        hydrogenC2Copy.draw();
        hydrogenC3Copy.draw();
        hydrogenC4Copy.draw();
        oxygenC1Copy.draw();
        oxygenC2Copy.draw();
        oxygenC3Copy.draw();
        oxygenC4Copy.draw();

    }
    else if(sceneNo == 6){
        drawSim(animate6);

    }

}

animate();
