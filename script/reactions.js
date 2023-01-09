var canvas = document.getElementById("reaction-simulation");
var ctx = canvas.getContext("2d");


function draw(){
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.roundRect(50,50,50,50,5);
    ctx.fill();
}

draw(ctx, canvas);