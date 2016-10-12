var colourPicker = {};
var pallet = [];
var selectedColour = 0;
function colourPickerInitialisation(){
	//Get Canvas
	colourPicker.canvas = document.getElementById("colourPicker");
	//Define Pallet
	pallet = [
		{"Hue": 0, "Saturation": 0, "Light": 0, "Opacity": 1}, //Black
		{"Hue": 0, "Saturation": 0, "Light": 100, "Opacity": 1}, //White
		{"Hue": 0, "Saturation": 100, "Light": 50, "Opacity": 1}, //Red
		{"Hue": 60, "Saturation": 100, "Light": 50, "Opacity": 1}, //Yellow
		{"Hue": 120, "Saturation": 100, "Light": 50, "Opacity": 1}, //Green
		{"Hue": 180, "Saturation": 100, "Light": 50, "Opacity": 1}, //Light Blue
		{"Hue": 240, "Saturation": 100, "Light": 50, "Opacity": 1}, //Blue
		{"Hue": 300, "Saturation": 100, "Light": 50, "Opacity": 1} //Pink
	];
	
	//get Image
	colourPicker.transparentcyStrip = new Image();
	colourPicker.transparentcyStrip.src = "images/transparency.png";
	colourPicker.transparentcyStrip.onload = function(){
		drawColourPicker();
	};
	
	//Draw Colour
	drawColours();
	
	//Event Handlers
	colourPicker.canvas.onmousedown = function(event){
		colourPicker.mouseDown = true;
		handlemouseDown(event.x, event.y)
	}
	colourPicker.canvas.onmousemove= function(event){
		if (colourPicker.mouseDown){
			handlemouseDown(event.x, event.y);
		}
	}
	colourPicker.canvas.onmouseup = function(){
		colourPicker.mouseDown = false;
	}
	colourPicker.canvas.onmouseleave = function(){
		colourPicker.mouseDown = false;
	}
}
/*var Hue = 0;
var Saturation = 100;
var Light = 50;
var Opacity = 1;*/
function drawAll(){
	drawColourPicker();
	drawColours();
}
function drawColourPicker(){
	var context = colourPicker.canvas.getContext("2d");
	var colourHeight = 20;
	var lineHeight = 2;
	var spacing = colourPicker.canvas.width/100;
	//Draw transparentcy Strip
	context.drawImage(colourPicker.transparentcyStrip, 0, colourPicker.canvas.height - (colourHeight * 4) -(lineHeight*3), colourPicker.canvas.width, colourHeight);
	context.drawImage(colourPicker.transparentcyStrip, 0, colourPicker.canvas.height - (colourHeight * 3) -(lineHeight*2), colourPicker.canvas.width, colourHeight);
	context.drawImage(colourPicker.transparentcyStrip, 0, colourPicker.canvas.height - (colourHeight * 2) -(lineHeight), colourPicker.canvas.width, colourHeight);
	context.drawImage(colourPicker.transparentcyStrip, 0, colourPicker.canvas.height - colourHeight, colourPicker.canvas.width, colourHeight);
	//draw Sepator Lines
	context.strokeStyle = "#000000";   
	context.lineWidth = lineHeight;
	context.beginPath();
	context.moveTo(0, (colourPicker.canvas.height - colourHeight) - (lineHeight/2));
	context.lineTo(colourPicker.canvas.width, (colourPicker.canvas.height - colourHeight) - (lineHeight/2));
	context.stroke();
	context.beginPath();
	context.moveTo(0, (colourPicker.canvas.height - (colourHeight * 2)) - lineHeight - (lineHeight/2));
	context.lineTo(colourPicker.canvas.width, (colourPicker.canvas.height - (colourHeight * 2)) - lineHeight - (lineHeight/2));
	context.stroke();
	context.beginPath();
	context.moveTo(0, (colourPicker.canvas.height - (colourHeight * 3)) - (lineHeight*2) - (lineHeight/2));
	context.lineTo(colourPicker.canvas.width, (colourPicker.canvas.height - (colourHeight * 3)) - (lineHeight*2) - (lineHeight/2));
	context.stroke();
	context.beginPath();
	context.moveTo(0, (colourPicker.canvas.height - (colourHeight * 4)) - (lineHeight*3) - (lineHeight/2));
	context.lineTo(colourPicker.canvas.width, (colourPicker.canvas.height - (colourHeight * 4)) - (lineHeight*3) - (lineHeight/2));
	context.stroke();
	context.lineWidth = 1;
	for (var i = 0; i < 100; i+=0.1){
		//draw Saturation
		if (Math.round(i) == Math.round(pallet[selectedColour].Saturation)){
			context.strokeStyle = "hsla("+ Math.round((pallet[selectedColour].Hue+180)%360) +", 100%, 50%, 1.0)";
			context.lineWidth = 5;			
		}else{
			context.lineWidth = 1;	
			context.strokeStyle = "hsla("+pallet[selectedColour].Hue+", "+ i +"%, "+ pallet[selectedColour].Light + "%, "+ pallet[selectedColour].Opacity + ")"; 
		}			
		context.beginPath();
		context.moveTo(spacing * i, colourPicker.canvas.height  - colourHeight - lineHeight);
		context.lineTo(spacing * i,  colourPicker.canvas.height - (colourHeight * 2) - lineHeight);
		context.stroke();
		//draw Light
		if (Math.round(i) == Math.round(pallet[selectedColour].Light)){
			context.strokeStyle = "hsla("+ Math.round((pallet[selectedColour].Hue+180)%360) +", 100%, 50%, 1.0)";
			context.lineWidth = 5;			
		}else{
			context.lineWidth = 1;	
			context.strokeStyle = "hsla("+pallet[selectedColour].Hue+", "+ pallet[selectedColour].Saturation + "%, " + i + "%, "+ pallet[selectedColour].Opacity + ")"; 
		}			
		context.beginPath();
		context.moveTo(spacing * i, colourPicker.canvas.height  - (colourHeight * 2) - (lineHeight*2));
		context.lineTo(spacing * i,  colourPicker.canvas.height - (colourHeight * 3) -(lineHeight*2));
		context.stroke();
		//draw opacity
		if (Math.round(i) == Math.round(pallet[selectedColour].Opacity * 100)){
			context.strokeStyle = "hsla("+ Math.round((pallet[selectedColour].Hue+180)%360) +", 100%, 50%, 1.0)";
			context.lineWidth = 5;			
		}else{
			context.lineWidth = 1;	
			context.strokeStyle = "hsla("+pallet[selectedColour].Hue+", "+ pallet[selectedColour].Saturation + "%, " + pallet[selectedColour].Light + "%, "+ (i/100) + ")"; 
		}			
		context.beginPath();
		context.moveTo(spacing * i, colourPicker.canvas.height  - (colourHeight * 3) - (lineHeight*3));
		context.lineTo(spacing * i,  colourPicker.canvas.height - (colourHeight * 4) -(lineHeight*3));
		context.stroke();
	}
	//Draw hue
	spacing = colourPicker.canvas.width/360;
	for (var i = 0; i < 360; i+=0.2){
		if (Math.round(i) == Math.round(pallet[selectedColour].Hue)){
			context.strokeStyle = "hsla("+ Math.round((i+180)%360) +", 100%, 50%, 1.0)";
			context.lineWidth = 5;			
		}else{
			context.lineWidth = 1;				
			context.strokeStyle = "hsla("+i+", "+ pallet[selectedColour].Saturation +"%, "+ pallet[selectedColour].Light + "%,"+ pallet[selectedColour].Opacity + ")"; 
		}
		context.beginPath();
		context.moveTo(spacing * i, colourPicker.canvas.height);
		context.lineTo(spacing * i,  (colourPicker.canvas.height - colourHeight));
		context.stroke();
	}
}
function drawColours(){
	var context = colourPicker.canvas.getContext("2d");
	context.lineWidth = 2;
	//Colour 1
	
	for (var i = 0; i < 8; i++){
		if (i == selectedColour){
			context.strokeStyle = "#00FF00"; 
		}else{
			context.strokeStyle = "#000000"; 
		}
		//context.drawImage(colourPicker.transparentcyStrip, 0, 0, 25, 25, 17.5 + (30 * (i%4)), 5 + (30 *  Math.floor(i/4)),30,30);
		context.fillStyle="hsla("+pallet[i].Hue+", "+ pallet[i].Saturation + "%, " + pallet[i].Light + "%, "+ pallet[i].Opacity + ")";
		context.fillRect(17.5 + (30 * (i%4)), 5 + (30 *  Math.floor(i/4)),25,25);
		context.strokeRect(17.5 + (30 * (i%4)), 5 + (30 *  Math.floor(i/4)),25,25);
	}
	
}
function handlemouseDown(x, y){
	var rect = colourPicker.canvas.getBoundingClientRect();
	x -= rect.left;
	y -= rect.top;
	var colourHeight = 20;
	var lineHeight = 2;
	//Detect if mouse within borders of the 8 colour pallet
	for (var i = 0; i < 8; i++){
		if (x > (17.5 + (30 * (i%4))) && x < (17.5 + (30 * (i%4)) + 25) && y > 5 + (30 *  Math.floor(i/4)) && y < (5 + (30 *  Math.floor(i/4)) + 25)){
			selectedColour = i;
			drawAll();
			return;
		}
	}
	if (y < colourPicker.canvas.height && y > colourPicker.canvas.height - colourHeight){
		pallet[selectedColour].Hue = (x/150) * 360;
		drawAll();
	}
	if (y < colourPicker.canvas.height  - colourHeight - lineHeight && y > colourPicker.canvas.height - (colourHeight * 2) - lineHeight){
		pallet[selectedColour].Saturation = (x/150) * 100;
		drawAll();
	}
	if (y < colourPicker.canvas.height  - (colourHeight * 2) - (lineHeight*2) && y > colourPicker.canvas.height  - (colourHeight * 3) - (lineHeight*3)){
		pallet[selectedColour].Light = (x/150) * 100;
		drawAll();
	}
	if (y < colourPicker.canvas.height  - (colourHeight * 3) - (lineHeight*3) && y > colourPicker.canvas.height - (colourHeight * 4) -(lineHeight*3)){
		pallet[selectedColour].Opacity = (x/150);
		drawAll();
	}
}