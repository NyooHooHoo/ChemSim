//Creating the canvas and context
var canvas = document.getElementById("reaction-simulation");
if (canvas.getContext) var ctx = canvas.getContext("2d"); else alert("Canvas element is not available");

//height and width of canvas
var width = canvas.width;
var height = canvas.height;

//
var sceneNo = 0;


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
arrowSmall.src = "assets/arrow2.png";

var help = new Image();
help.src = "assets/help.png"

var helpW = new Image();
helpW.src = "assets/helpWhite.png"

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
            help1 = false;

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
            help2 = false;

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
            help3 = false;

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
            help4 = false;

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
            animate4 = 0;
            help5 = false;

            carbonCCopy.x = 140;
            carbonCCopy.y = 380;
            hydrogenC1Copy.x = 80;
            hydrogenC1Copy.y = 330;
            hydrogenC2Copy.x = 200;
            hydrogenC2Copy.y = 330;
            hydrogenC3Copy.x = 80;
            hydrogenC3Copy.y = 430;
            hydrogenC4Copy.x = 200;
            hydrogenC4Copy.y = 430;
            oxygenC1Copy.x = 360;
            oxygenC1Copy.y = 330;
            oxygenC2Copy.x = 430;
            oxygenC2Copy.y = 330;
            oxygenC3Copy.x = 360;
            oxygenC3Copy.y = 430;
            oxygenC4Copy.x = 430;
            oxygenC4Copy.y = 430;
        }

        else if(isInside(mousePos, acidBase)){
            hydrogenA1Copy.x = 80;
            hydrogenA1Copy.y = 380;
            chlorineACopy.x = 165;
            chlorineACopy.y = 380;
            sodiumACopy.x = 380;
            sodiumACopy.y = 390;
            oxygenACopy.x = 435;
            oxygenACopy.y = 300;
            hydrogenA2Copy.x = 435;
            hydrogenA2Copy.y = 467;

            sceneNo = 6;
            animate6 = 0;
            help6 = false;
        }
    }
    else if(sceneNo == 1){

        if(isInside(mousePos, backButton) && help1 == false){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate1 == 0 && help1 == false){
            animate1 = 1;
        }
        else if(isInside(mousePos, playButton) && animate1 == 1 && help1 == false){
            animate1 = 0;
        }
        else if(isInside(mousePos, playButton) && animate1 == 2 && help1 == false){
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

        if(isInside(mousePos,helpButton) && help1 == false){
            help1 = true;
            if(animate1 == 1) animate1 = 0;
        }
        else if(isInside(mousePos,helpButton)){
            help1 = false;
        }

    }
    else if(sceneNo == 2){
        if(isInside(mousePos, backButton) && help2 == false){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate2 == 0 && help2 == false){
            animate2 = 1;
        }
        else if(isInside(mousePos, playButton) && animate2 == 1 && help2 == false){
            animate2 = 0;
        }
        else if(isInside(mousePos, playButton) && animate2 == 2 && help2 == false){
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

        if(isInside(mousePos,helpButton) && help2 == false){
            help2 = true;
            if(animate2 == 1) animate2 = 0;
        }
        else if(isInside(mousePos,helpButton)){
            help2 = false;
        }

    }
    else if(sceneNo == 3){
        if(isInside(mousePos, backButton) && help3 == false){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate3 == 0 && help3 == false){
            animate3 = 1;
        }
        else if(isInside(mousePos, playButton) && animate3 == 1 && help3 == false){
            animate3 = 0;
        }
        else if(isInside(mousePos, playButton) && animate3 == 2 && help3 == false){
            sodiumSDCopy.x = 100;
            sodiumSDCopy.y = 380;
            chlorineSDCopy.x = 200;
            chlorineSDCopy.y = 380;
            potassiumSDCopy.x = 440;
            potassiumSDCopy.y = 380;

            animate3 = 0;
        }

        if(isInside(mousePos,helpButton) && help3 == false){
            help3 = true;
            if(animate3 == 1) animate3 = 0;
        }
        else if(isInside(mousePos,helpButton)){
            help3 = false;
        }
    }
    else if(sceneNo == 4){
        if(isInside(mousePos, backButton) && help4 == false){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate4 == 0 && help4 == false){
            animate4 = 1;
        }
        else if(isInside(mousePos, playButton) && animate4 == 1 && help4 == false){
            animate4 = 0;
        }
        else if(isInside(mousePos, playButton) && animate4 == 2 && help4 == false){
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

        if(isInside(mousePos,helpButton) && help4 == false){
            help4 = true;
            if(animate4 == 1) animate4 = 0;
        }
        else if(isInside(mousePos,helpButton)){
            help4 = false;
        }
    }
    else if(sceneNo == 5){
        if(isInside(mousePos, backButton) && help5 == false){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate5 == 0 && help5 == false){
            animate5 = 1;
        }
        else if(isInside(mousePos, playButton) && animate5 == 1 && help5 == false){
            animate5 = 0;
        }
        else if(isInside(mousePos, playButton) && animate5 == 2 && help5 == false){
            carbonCCopy.x = 140;
            carbonCCopy.y = 380;
            hydrogenC1Copy.x = 80;
            hydrogenC1Copy.y = 330;
            hydrogenC2Copy.x = 200;
            hydrogenC2Copy.y = 330;
            hydrogenC3Copy.x = 80;
            hydrogenC3Copy.y = 430;
            hydrogenC4Copy.x = 200;
            hydrogenC4Copy.y = 430;
            oxygenC1Copy.x = 360;
            oxygenC1Copy.y = 330;
            oxygenC2Copy.x = 430;
            oxygenC2Copy.y = 330;
            oxygenC3Copy.x = 360;
            oxygenC3Copy.y = 430;
            oxygenC4Copy.x = 430;
            oxygenC4Copy.y = 430;
            
            animate5 = 0;
        }

        if(isInside(mousePos,helpButton) && help5 == false){
            help5 = true;
            if(animate5 == 1) animate5 = 0;
        }
        else if(isInside(mousePos,helpButton)){
            help5 = false;
        }
    }
    else if(sceneNo == 6){
        if(isInside(mousePos, backButton) && help6 == false){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate6 == 0 && help6 == false){
            animate6 = 1;
        }
        else if(isInside(mousePos, playButton) && animate6 == 1 && help6 == false){
            animate6 = 0;
        }
        else if(isInside(mousePos, playButton) && animate6 == 2 && help6 == false){
            hydrogenA1Copy.x = 80;
            hydrogenA1Copy.y = 380;
            chlorineACopy.x = 165;
            chlorineACopy.y = 380;
            sodiumACopy.x = 380;
            sodiumACopy.y = 390;
            oxygenACopy.x = 435;
            oxygenACopy.y = 300;
            hydrogenA2Copy.x = 435;
            hydrogenA2Copy.y = 467;

            animate6 = 0;
        }

        if(isInside(mousePos,helpButton) && help6 == false){
            help6 = true;
            if(animate6 == 1) animate6 = 0;
        }
        else if(isInside(mousePos,helpButton)){
            help6 = false;
        }
    }

}, false);


function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}


var helpButton = {
    x:1090,
    y:590,
    width:100,
    height:100
};

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
    ctx.fillRect(rect.x,rect.y,rect.width,rect.height,10);
    // ctx.fill();
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

function drawSim(animate, title){
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

    ctx.font = "50px ChalkFont";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(title, canvas.width/2, 75);

    ctx.drawImage(help, helpButton.x, helpButton.y);
}

function drawHelp(title){
    ctx.fillStyle = "rgb(0,0,0,0.9)";
    ctx.fillRect(0,0,width,height);

    ctx.font = "60px ChalkFont";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(title, canvas.width/2, 50);

    ctx.drawImage(helpW, helpButton.x, helpButton.y);

    ctx.font = "25px ChalkFont";
    ctx.textAlign = "center";
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

    moveUpSequence(targetX, targetY, maxY){
        if(this.y > maxY && this.x < targetX){
            this.moveUp();
        }
        else if(this.y <= maxY && this.x < targetX){
            this.moveRight();
        }
        else if(this.y < targetY && this.x >= targetX){
            this.moveDown();
        }
    }

    moveDownSequence(targetX, targetY, maxY){
        if(this.y < maxY && this.x < targetX){
            this.moveDown();
        }
        else if(this.y >= maxY && this.x < targetX){
            this.moveRight();
        }
        else if(this.y > targetY && this.x >= targetX){
            this.moveUp();
        }
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

//Boolean Variables
var help1 = false;
var help2 = false;
var help3 = false;
var help4 = false;
var help5 = false;
var help6 = false;


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

let carbonCCopy = new Molecule(140, 380, 50, "C", "rgb(255, 192, 110)");
let hydrogenC1Copy = new Molecule(80, 330, 30, "H", "rgb(255, 251, 138)");
let hydrogenC2Copy = new Molecule(200, 330, 30, "H", "rgb(255, 251, 138)");
let hydrogenC3Copy = new Molecule(80, 430, 30, "H", "rgb(255, 251, 138)");
let hydrogenC4Copy = new Molecule(200, 430, 30, "H", "rgb(255, 251, 138)");
let oxygenC1Copy = new Molecule(360, 330, 35, "O", "rgb(138, 204, 255)");
let oxygenC2Copy = new Molecule(430, 330, 35, "O", "rgb(138, 204, 255)");
let oxygenC3Copy = new Molecule(360, 430, 35, "O", "rgb(138, 204, 255)");
let oxygenC4Copy = new Molecule(430, 430, 35, "O", "rgb(138, 204, 255)");


//Acid Objects
let hydrogenA1 = new Molecule(80, 380, 35, "H", "rgb(209, 250, 152)");
let chlorineA = new Molecule(165, 380, 50, "Cl", "rgb(158, 249, 255)");
let sodiumA = new Molecule(380, 390, 60, "Na", "rgb(245, 198, 137)");
let oxygenA = new Molecule(435, 300, 45, "O", "rgb(216, 125, 255)");
let hydrogenA2 = new Molecule(435, 467, 35, "H", "rgb(209, 250, 152)");

let hydrogenA1Copy = new Molecule(80, 380, 35, "H", "rgb(209, 250, 152)");
let chlorineACopy = new Molecule(165, 380, 50, "Cl", "rgb(158, 249, 255)");
let sodiumACopy = new Molecule(380, 390, 60, "Na", "rgb(245, 198, 137)");
let oxygenACopy = new Molecule(435, 300, 45, "O", "rgb(216, 125, 255)");
let hydrogenA2Copy = new Molecule(435, 467, 35, "H", "rgb(209, 250, 152)");


//Colour variables to change for the buttons
var synCol = "white";
var decCol = "white";
var sDisCol = "white";
var dDisCol = "white";
var comCol = "white";
var acidCol = "white";

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
        drawSim(animate1, "Syntehsis Reaction");

        ctx.drawImage(plus, 300, 370);
        ctx.drawImage(arrow, 560, 330);

        if(animate1){

            if(hydrogenS1Copy.x >= 870 && hydrogenS1Copy.y >= 320 && hydrogenS2Copy.x >= 870 && hydrogenS2Copy.y <= 480){
                chlorineS1Copy.moveUpSequence(980,320,200);
                chlorineS2Copy.moveDownSequence(980,480,600);
            }
            else{
                hydrogenS1Copy.moveUpSequence(870,320,200);
                hydrogenS2Copy.moveDownSequence(870,480,600);
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

        if(hydrogenS1Copy.x >= 870 && hydrogenS1Copy.y >= 320 && 
            chlorineS1Copy.x >= 980 && chlorineS1Copy.y >= 320 && 
            hydrogenS2Copy.x >= 870 && hydrogenS2Copy.y <= 480 && 
            chlorineS2Copy.x >= 980 && chlorineS2Copy.y <= 480){
                ctx.fillStyle = "black";
                ctx.font = "50px serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("H2",hydrogenS1.x,hydrogenS2.y+140);
                ctx.fillText("Cl2",chlorineS1.x,hydrogenS2.y+140);
                ctx.fillText("2 HCl",hydrogenS2Copy.x+50,hydrogenS2.y+140);
                animate1=2;
        }

        if(help1){
            drawHelp("Synthesis Explanation");
            ctx.fillText("Synthesis Reaction is when Multiple reactants create one product.",width/2,200);
            ctx.fillText("Metal + Nonmetal -> Ionic Compound",width/2,250);
            ctx.fillText("Hydrogen + Nonmetal -> Simple Acid",width/2,300);
            ctx.fillText("Nonmetal + Nonmetal -> Molecular Compound",width/2,350);
            ctx.font = "40px sans";
            ctx.fillText("Generic Equation:",width/2,420);
            ctx.fillText("A + B -> AB",width/2,500);
            ctx.font = "30px ChalkFont";
            ctx.fillText("Always make sure the Equation is balanced",width/2,600);
        }
       
    }
    else if(sceneNo == 2){
        drawSim(animate2,"Decomposition Reaction");
        
        ctx.drawImage(arrow, 450, 310);
        ctx.drawImage(plus, 875, 360);

        if(animate2 == 1){
            if(hydrogenD1Copy.x >= 1000 && hydrogenD1Copy.y >= 340 && hydrogenD2Copy.x >= 1060 && hydrogenD2Copy.y >= 340 && hydrogenD3Copy.x >= 1000 && hydrogenD3Copy.y <= 440 && hydrogenD4Copy.x >= 1060 && hydrogenD4Copy.y <= 440){
                oxygenD1Copy.moveUpSequence(780,340,170);
                oxygenD2Copy.moveDownSequence(780,440,610);
            }
            else{
                hydrogenD1Copy.moveUpSequence(1000,340,180);
                hydrogenD2Copy.moveUpSequence(1060,340,180);
                hydrogenD3Copy.moveDownSequence(1000,440,600);
                hydrogenD4Copy.moveDownSequence(1060,440,600);
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

        if(hydrogenD1Copy.x >= 1000 && hydrogenD1Copy.y >= 340 && 
            hydrogenD2Copy.x >= 1060 && hydrogenD2Copy.y >= 340 && 
            hydrogenD3Copy.x >= 1000 && hydrogenD3Copy.y <= 440 && 
            hydrogenD4Copy.x >= 1060 && hydrogenD4Copy.y <= 440 && 
            oxygenD1Copy.x >= 780 && oxygenD1Copy.y >= 340 && 
            oxygenD2Copy.x >= 780 && oxygenD2Copy.y <= 440){
                ctx.fillStyle = "black";
                ctx.font = "50px serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("2 H2O",oxygenD1.x,oxygenD2.y+140);
                ctx.fillText("O2",oxygenD1Copy.x,oxygenD2.y+140);
                ctx.fillText("2 H2",hydrogenD1Copy.x+hydrogenD1Copy.radius,oxygenD2.y+140);
                animate2 = 2;
        }

        if(help2){
            drawHelp("Decomposition Explanation");
            ctx.fillText("Decomposition Reaction is when One reactant splits into multiple products.",width/2,200);
            ctx.fillText("Ionic Compound -> Metal + Nonmetal",width/2,250);
            ctx.fillText("Molecular Compound -> Nonmetal + Nonmetal",width/2,300);
            ctx.font = "40px sans";
            ctx.fillText("Generic Equation:",width/2,420);
            ctx.fillText("AB -> A + B",width/2,500);
            ctx.font = "30px ChalkFont";
            ctx.fillText("Always make sure the Equation is balanced",width/2,600);
        }

    }
    else if(sceneNo == 3){
        drawSim(animate3,"Single Displacement");

        ctx.drawImage(arrowSmall, 570, 330);
        ctx.drawImage(plus, 300, 360);
        ctx.drawImage(plus, 1000, 360);

        if(animate3 == 1){          
            if(chlorineSDCopy.y >= 380 && chlorineSDCopy.x >= 900){
                sodiumSDCopy.moveUpSequence(1125,380,220);
                potassiumSDCopy.moveDownSequence(790,380,540);

            }
            else{
                chlorineSDCopy.moveUpSequence(900,380,220);
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

        if(chlorineSDCopy.y >= 380 && chlorineSDCopy.x >= 900 && 
            potassiumSDCopy.y <= 380 && potassiumSDCopy.x >= 790 && 
            sodiumSDCopy.y >= 380 && sodiumSDCopy.x >= 1125){
                ctx.fillStyle = "black";
                ctx.font = "50px serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.fillText("NaCl",sodiumSD.x+60,chlorineSD.y+140);
                ctx.fillText("K",potassiumSD.x,chlorineSD.y+140);
                ctx.fillText("KCl",potassiumSDCopy.x+potassiumSDCopy.radius,chlorineSD.y+140);
                ctx.fillText("Na",sodiumSDCopy.x,chlorineSD.y+140);
                animate3 = 2;
        }   

        if(help3){
            drawHelp("Single Displacement");
            ctx.fillText("In this Reaction One element displaces another element in a compound.",width/2,200);
            ctx.fillText("only ions of the same type can switch",width/2,250);
            ctx.fillText("Metal replaces a Metal",width/2,300);
            ctx.fillText("Nonmetal replaces a Nonmetal",width/2,350);
            ctx.font = "40px sans";
            ctx.fillText("Generic Equation:",width/2,420);
            ctx.fillText("Metal: AB + C -> CB + A",width/2,500);
            ctx.fillText("Non-Metal: AB + C -> AC + B",width/2,580);
            ctx.font = "30px ChalkFont";
            ctx.fillText("Always make sure the Equation is balanced",width/2,650);
        }

    }
    else if(sceneNo == 4){
        drawSim(animate4, "Double Displacement");

        ctx.drawImage(arrowSmall, 550, 330);
        ctx.drawImage(plus, 220, 360);
        ctx.drawImage(plus, 935, 360);

        if(animate4 == 1){
            if(calciumDDCopy.y <= 380 && calciumDDCopy.x >= 1050 && magnesiumDDCopy.y >= 380 && magnesiumDDCopy.x >= 790){
                sulfurDDCopy.moveUpSequence(880,380,220);
                oxygenDDCopy.moveDownSequence(1130,380,540);

            }
            else{
                magnesiumDDCopy.moveUpSequence(790,380,220);
                calciumDDCopy.moveDownSequence(1050,380,540);
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

        if(oxygenDDCopy.y <= 380 && oxygenDDCopy.x >= 1130 && 
            calciumDDCopy.y <= 380 && calciumDDCopy.x >= 1050 && 
            magnesiumDDCopy.y >= 380 && magnesiumDDCopy.x >= 790 && 
            sulfurDDCopy.y >= 380 && sulfurDDCopy.x >= 880){
                ctx.fillStyle = "black";
                ctx.font = "50px serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.fillText("MgO",magnesiumDD.x+40,magnesiumDD.y+140);
                ctx.fillText("CaS",calciumDD.x+40,magnesiumDD.y+140);
                ctx.fillText("MgS",magnesiumDDCopy.x+40,magnesiumDD.y+140);
                ctx.fillText("CaO",calciumDDCopy.x+40,magnesiumDD.y+140);
                animate4 = 2;
        }

        if(help4){
            drawHelp("Double Displacement");
            ctx.fillText("Two aqueous ionic compounds switch places with each other",width/2,200);
            ctx.fillText("Metal switches with a Metal",width/2,250);
            ctx.font = "40px sans";
            ctx.fillText("Generic Equation:",width/2,370);
            ctx.fillText("AB + CD -> CB + AD",width/2,450);
            ctx.font = "30px ChalkFont";
            ctx.fillText("Always make sure the Equation is balanced",width/2,650);
        }
    }
    else if(sceneNo == 5){
        drawSim(animate5,"Combustion Reaction");

        ctx.drawImage(arrowSmall, 510, 330);
        ctx.drawImage(plus, 250, 360);
        ctx.drawImage(plus, 850, 360);

        if(animate5 == 1){
            if(carbonCCopy.y >= 380 && carbonCCopy.x >= 750 && oxygenC2Copy.y >= 380 && oxygenC2Copy.x >= 980 && oxygenC4Copy.y <= 380 && oxygenC4Copy.x >= 1100){
                oxygenC1Copy.moveUpSequence(750,295,220);
                oxygenC3Copy.moveDownSequence(750,465,540);
                hydrogenC1Copy.moveUpSequence(980,315,180);
                hydrogenC2Copy.moveUpSequence(1100,315,180);
                hydrogenC3Copy.moveDownSequence(980,445,580);
                hydrogenC4Copy.moveDownSequence(1100,445,580);
            }
            else{
                carbonCCopy.moveUpSequence(750,380,200);
                oxygenC2Copy.moveUpSequence(980,380,200);
                oxygenC4Copy.moveDownSequence(1100,380,560);
            }
            
            if(carbonCCopy.y >= 380 && carbonCCopy.x >= 750) carbonCCopy.draw();
            if(oxygenC2Copy.y >= 380 && oxygenC2Copy.x >= 980) oxygenC2Copy.draw();
            if(oxygenC1Copy.y >= 295 && oxygenC1Copy.x >= 750) oxygenC1Copy.draw();
            if(hydrogenC1Copy.y >= 315 && hydrogenC1Copy.x >= 980) hydrogenC1Copy.draw();
            if(hydrogenC2Copy.y >= 315 && hydrogenC2Copy.x >= 1100) hydrogenC2Copy.draw();
            if(oxygenC3Copy.y <= 465 && oxygenC3Copy.x >= 750) oxygenC3Copy.draw();
            if(hydrogenC3Copy.y <= 445 && hydrogenC3Copy.x >= 980) hydrogenC3Copy.draw();
            if(hydrogenC4Copy.y <= 445 && hydrogenC4Copy.x >= 1100) hydrogenC4Copy.draw();
            if(oxygenC4Copy.y <= 380 && oxygenC4Copy.x >= 1100) oxygenC4Copy.draw();
            
            carbonC.draw();
            hydrogenC1.draw();
            hydrogenC2.draw();
            hydrogenC3.draw();
            hydrogenC4.draw();
            oxygenC1.draw();
            oxygenC2.draw();
            oxygenC3.draw();
            oxygenC4.draw();
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

        if(carbonCCopy.y >= 380 && carbonCCopy.x >= 750 &&
            oxygenC2Copy.y >= 380 && oxygenC2Copy.x >= 980 &&
            oxygenC1Copy.y >= 295 && oxygenC1Copy.x >= 750 &&
            hydrogenC1Copy.y >= 315 && hydrogenC1Copy.x >= 980 &&
            hydrogenC2Copy.y >= 315 && hydrogenC2Copy.x >= 1100 &&
            oxygenC3Copy.y <= 465 && oxygenC3Copy.x >= 750 &&
            hydrogenC3Copy.y <= 445 && hydrogenC3Copy.x >= 980 &&
            hydrogenC4Copy.y <= 445 && hydrogenC4Copy.x >= 1100 &&
            oxygenC4Copy.y <= 380 && oxygenC4Copy.x >= 1100){
                ctx.fillStyle = "black";
                ctx.font = "50px serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.fillText("CH4",carbonC.x,carbonC.y+180);
                ctx.fillText("2 O2",oxygenC1.x+oxygenC1.radius,carbonC.y+180);
                ctx.fillText("CO2",carbonCCopy.x,carbonC.y+180);
                ctx.fillText("2 H2O",oxygenC2Copy.x+60,carbonC.y+180);
                animate5 = 2;
        }

        if(help5){
            drawHelp("Combustion Explanation");
            ctx.fillText("Combustion reactions occur whenever oxygen is a reactant.",width/2,150);
            ctx.fillText("Energy is also released in the form of heat or light.",width/2,200);
            ctx.fillText("Non metal and Metal combustion (also synthesis)",width/2,250);
            ctx.fillText("Inocomplete and Complete Hydrocarbon combustion",width/2,300);
            ctx.font = "40px sans";
            ctx.fillText("Generic Equation:",width/2,370);
            ctx.fillText("Complete: CxHy + O2 -> CO2 + H2O",width/2,450);
            ctx.fillText("Incomplete: CxHy + O2 -> H2O (+ CO2) (+ CO) (+ C)",width/2,530);
            ctx.font = "30px ChalkFont";
            ctx.fillText("Always make sure the Equation is balanced",width/2,650);
        }

    }
    else if(sceneNo == 6){
        drawSim(animate6,"Neutralization Reaction");

        ctx.drawImage(arrowSmall, 510, 330);
        ctx.drawImage(plus, 240, 360);
        ctx.drawImage(plus, 940, 360);


        if(animate6 == 1){
            if(chlorineACopy.y >= 380 && chlorineACopy.x >= 730 && sodiumACopy.y <= 380 && sodiumACopy.x >= 840){
                hydrogenA1Copy.moveUpSequence(1075,300,180);
                oxygenACopy.moveUpSequence(1075,380,180);
                hydrogenA2Copy.moveDownSequence(1075,460,580);
            }
            else{
                chlorineACopy.moveUpSequence(730,380,180);
                sodiumACopy.moveDownSequence(840,380,580);
            }

            //up
            if(chlorineACopy.y >= 380 && chlorineACopy.x >= 730) chlorineACopy.draw();
            if(hydrogenA1Copy.y >= 300 && hydrogenA1Copy.x >= 1075) hydrogenA1Copy.draw();
            if(oxygenACopy.y >= 380 && oxygenACopy.x >= 1075) oxygenACopy.draw();
            //down
            if(sodiumACopy.y <= 380 && sodiumACopy.x >= 840) sodiumACopy.draw();
            if(hydrogenA2Copy.y <= 460 && hydrogenA2Copy.x >= 1075) hydrogenA2Copy.draw();

            hydrogenA1.draw();
            chlorineA.draw();
            sodiumA.draw();
            oxygenA.draw();
            hydrogenA2.draw();
        }
        else{
            hydrogenA1.draw();
            chlorineA.draw();
            sodiumA.draw();
            oxygenA.draw();
            hydrogenA2.draw();

            hydrogenA1Copy.draw();
            chlorineACopy.draw();
            sodiumACopy.draw();
            oxygenACopy.draw();
            hydrogenA2Copy.draw();
        }


        if(chlorineACopy.y >= 380 && chlorineACopy.x >= 730 &&
            hydrogenA1Copy.y >= 300 && hydrogenA1Copy.x >= 1075 &&
            oxygenACopy.y >= 380 && oxygenACopy.x >= 1075 &&
            sodiumACopy.y <= 380 && sodiumACopy.x >= 840 &&
            hydrogenA2Copy.y <= 460 && hydrogenA2Copy.x >= 1075){
                ctx.fillStyle = "black";
                ctx.font = "50px serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.fillText("HCl",hydrogenA1.x+40,chlorineA.y+180);
                ctx.fillText("NaOH",sodiumA.x+20,chlorineA.y+180);
                ctx.fillText("NaCl",chlorineACopy.x+50,chlorineA.y+180);
                ctx.fillText("H2O",oxygenACopy.x,chlorineA.y+180);

                animate6 = 2;
        }

        if(help6){
            drawHelp("Neutralization Explanation");
            ctx.font = "18px ChalkFont";
            ctx.fillText("Neutralization is a chemical reaction between an acid and a base",width/2,150);
            ctx.fillText("Neutralization reactions with hydroxide bases are generally double displacement reactions",width/2,200);
            ctx.fillText("Neutralization with a bicarbonate base involves a double displacement reaction with a decomposition reaction",width/2,250);
            ctx.font = "40px sans";
            ctx.fillText("Generic Equation:",width/2,370);
            ctx.fillText("Hydroxide: Acid + Base -> Salt + Water",width/2,450);
            ctx.fillText("Bicarbonate: Acid + Base -> Salt + Water + Carbon Dioxide",width/2,530);
            ctx.font = "30px ChalkFont";
            ctx.fillText("Always make sure the Equation is balanced",width/2,650);
        }

    }

}

animate();
