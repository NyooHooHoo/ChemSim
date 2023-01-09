myCanvas = document.getElementById("builderCanvas");
myContext = myCanvas.getContext("2d");
function draw(ctx,canvas) {
	ctx.fillstyle = "black"
	ctx.arc(10,10,10,0, Math.PI*2)
	ctx.fill()
}
draw(myContext,myCanvas);