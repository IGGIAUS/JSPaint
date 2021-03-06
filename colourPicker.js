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
		
	//Event Handlers
	colourPicker.canvas.onmousedown = function(event){
		colourPicker.mouseDown = true;
		colourPicker.handlemouseDown(event.x, event.y)
	}
	colourPicker.canvas.onmousemove= function(event){
		if (colourPicker.mouseDown){
			colourPicker.handlemouseDown(event.x, event.y);
		}
	}
	colourPicker.canvas.onmouseup = function(){
		colourPicker.mouseDown = false;
	}
	colourPicker.canvas.onmouseleave = function(){
		colourPicker.mouseDown = false;
	}
	//Clears canvas
	colourPicker.clear = function(){
		var context = colourPicker.canvas.getContext("2d");
		context.fillStyle= "#FFFFFF";
		context.fillRect(0,0, colourPicker.canvas.width, colourPicker.canvas.height);
	}
	//Clears canvas and redraws it.
	colourPicker.drawAll = function(){
		colourPicker.clear();
		colourPicker.drawColourPicker();
		colourPicker.drawColours();
	}
	//Draws sliders
	colourPicker.drawColourPicker = function(){
		var context = colourPicker.canvas.getContext("2d");
		var colourHeight = 20;
		var lineHeight = 2;
		var spacing = colourPicker.canvas.width/100;
		//Draw transparentcy Strip
		context.drawImage(colourPicker.transparentcyStrip, 0, 0, colourPicker.canvas.width, colourHeight, 0, colourPicker.canvas.height - (colourHeight * 4) -(lineHeight*3), colourPicker.canvas.width, colourHeight);
		context.drawImage(colourPicker.transparentcyStrip, 0, 0, colourPicker.canvas.width, colourHeight, 0, colourPicker.canvas.height - (colourHeight * 3) -(lineHeight*2), colourPicker.canvas.width, colourHeight);
		context.drawImage(colourPicker.transparentcyStrip, 0, 0, colourPicker.canvas.width, colourHeight, 0, colourPicker.canvas.height - (colourHeight * 2) -(lineHeight), colourPicker.canvas.width, colourHeight);
		context.drawImage(colourPicker.transparentcyStrip, 0, 0, colourPicker.canvas.width, colourHeight, 0, colourPicker.canvas.height - colourHeight, colourPicker.canvas.width, colourHeight);
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
	
	colourPicker.drawColours = function(){
		var context = colourPicker.canvas.getContext("2d");
		context.lineWidth = 2;
		//Colour 1
		
		for (var i = 0; i < 8; i++){
			if (i == selectedColour){
				context.strokeStyle = "#00FF00"; 
			}else{
				context.strokeStyle = "#000000"; 
			}
			context.drawImage(colourPicker.transparentcyStrip, 0, 0, 25, 25, 17.5 + (30 * (i%4)), 5 + (30 *  Math.floor(i/4)),25,25);
			context.fillStyle="hsla("+pallet[i].Hue+", "+ pallet[i].Saturation + "%, " + pallet[i].Light + "%, "+ pallet[i].Opacity + ")";
			context.fillRect(17.5 + (30 * (i%4)), 5 + (30 *  Math.floor(i/4)),25,25);
			context.strokeRect(17.5 + (30 * (i%4)), 5 + (30 *  Math.floor(i/4)),25,25);
		}
		
	}
	//Create Function to handle mouse Down on canvas. Effects slider, and pallet.
	colourPicker.handlemouseDown = function(x, y){
		var rect = colourPicker.canvas.getBoundingClientRect();
		x -= rect.left;
		y -= rect.top;
		var colourHeight = 20;
		var lineHeight = 2;
		//Detect if mouse within borders of the 8 colour pallet
		for (var i = 0; i < 8; i++){
			if (x > (17.5 + (30 * (i%4))) && x < (17.5 + (30 * (i%4)) + 25) && y > 5 + (30 *  Math.floor(i/4)) && y < (5 + (30 *  Math.floor(i/4)) + 25)){
				selectedColour = i;
				colourPicker.drawAll();
				return;
			}
		}
		if (y < colourPicker.canvas.height && y > colourPicker.canvas.height - colourHeight){
			pallet[selectedColour].Hue = (x/150) * 360;
			colourPicker.drawAll();
			return;
		}
		if (y < colourPicker.canvas.height  - colourHeight - lineHeight && y > colourPicker.canvas.height - (colourHeight * 2) - lineHeight){
			pallet[selectedColour].Saturation = (x/150) * 100;
			colourPicker.drawAll();
			return;
		}
		if (y < colourPicker.canvas.height  - (colourHeight * 2) - (lineHeight*2) && y > colourPicker.canvas.height  - (colourHeight * 3) - (lineHeight*3)){
			pallet[selectedColour].Light = (x/150) * 100;
			colourPicker.drawAll();
			return;
		}
		if (y < colourPicker.canvas.height  - (colourHeight * 3) - (lineHeight*3) && y > colourPicker.canvas.height - (colourHeight * 4) -(lineHeight*3)){
			pallet[selectedColour].Opacity = (x/150);
			colourPicker.drawAll();
			return;
		}
	}
	
	colourPicker.getCurrentRGB = function(){
	    var h = pallet[selectedColour].Hue / 360;
		var s = pallet[selectedColour].Saturation / 100;
		var l = pallet[selectedColour].Light / 100;
		var a = pallet[selectedColour].Opacity
		var r, g, b;
		if (s == 0) {
			r = g = b = l; // achromatic
		}else{
			function hue2rgb(p, q, t) {
			    if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1/6) return p + (q - p) * 6 * t;
				if (t < 1/2) return q;
				if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}

			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;

			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}

		return [ r * 255, g * 255, b * 255, a * 255];
	}
	colourPicker.setCurrentRGB = function(colour){
		var r = colour[0]/255;
		var g = colour[1]/255;
		var b = colour[2]/255;
		var a = colour[3]/255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;
		if(max == min){
			h = pallet[selectedColour].Hue/360;
			s = 0; // achromatic
		}else{
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch(max){
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}		
		pallet[selectedColour].Hue = h * 360;
		pallet[selectedColour].Saturation = s * 100;
		pallet[selectedColour].Light = l * 100;
		pallet[selectedColour].Opacity = a;
	}
	//get Image
	colourPicker.transparentcyStrip = new Image();
	colourPicker.transparentcyStrip.src = "images/transparency.png";
	colourPicker.transparentcyStrip.onload = function(){
		//Draw Canvas
		colourPicker.drawAll();
	};
	colourPicker.colourRGBCompare = function(colour1, colour2){
		if (colour1[0] == colour2[0] &&  colour1[1] == colour2[1] &&  colour1[2] == colour2[2] &&  colour1[3] == colour2[3]){
			return true;
		}
		return false;
	}
	colourPicker.colourHSLCompare = function(colour1, colour2){
		if (colour1.Hue == colour2.Hue &&  colour1.Saturation == colour2.Saturation &&  colour1.Light == colour2.Light &&  colour1.Opacity == colour2.Opacity){
			return true;
		}
		return false;
	}
	
}