var canvasEditor = {};

function canvasEditorInitialisation(){
	//Get Canvas
	canvasEditor.canvas = document.getElementById("canvas");
	canvasEditor.hiddenCanvas = document.getElementById("offscreenCanvas");
	//Event Handlers
	canvasEditor.canvas.onmousedown = function(event){
		canvasEditor.mouseDown = true;
		canvasEditor.handlemouseDown(event.x, event.y)
	}
	canvasEditor.canvas.onmousemove= function(event){
		if (canvasEditor.mouseDown){
			canvasEditor.handlemouseDown(event.x, event.y);
		}
	}
	canvasEditor.canvas.onmouseup = function(){
		canvasEditor.mouseDown = false;
	}
	canvasEditor.canvas.onmouseleave = function(){
		canvasEditor.mouseDown = false;
	}
	//Clears canvas
	canvasEditor.clear = function(){
		var context = canvasEditor.canvas.getContext("2d");
		context.fillStyle= "#FFFFFF";
		context.fillRect(0,0, canvasEditor.canvas.width, canvasEditor.canvas.height);
	}
	//Clears canvas and redraws it.
	canvasEditor.drawAll = function(){
		var context = canvasEditor.canvas.getContext("2d");
		//draws background
		for (var x = 0; x < canvasEditor.canvas.width; x += canvasEditor.transparentcyStrip.width){
			for (var y = 0; y < canvasEditor.canvas.height; y += canvasEditor.transparentcyStrip.height){
				context.drawImage(canvasEditor.transparentcyStrip, x, y);
			}
		}
		//draws each layerX
		for (var l = 0; l < imgLayers.length; l++){
			context.drawImage(canvasEditor.makeImage(imgLayers[l].img), 0,0);
		}
		
	}
	
	canvasEditor.handlemouseDown = function(x, y){
		var rect = canvasEditor.canvas.getBoundingClientRect();
		x = Math.round(x - rect.left);
		y = Math.round(y - rect.top);
		if (imgLayers.length < 1){
			addLayer("Background");
			selectedLayer = 0;
		}
		//convert coordanates to linar
		var index = (x + (canvasEditor.canvas.width * y)) * 4
		var colour = colourPicker.getCurrentRGB();
		imgLayers[selectedLayer].img.data[index +0] = colour[0];
		imgLayers[selectedLayer].img.data[index +1] = colour[1];
		imgLayers[selectedLayer].img.data[index +2] = colour[2];
		imgLayers[selectedLayer].img.data[index +3] = colour[3];
		canvasEditor.drawAll();
	}
	
	canvasEditor.makeImage = function(imageData){
		var context2 = canvasEditor.hiddenCanvas.getContext("2d");
		context2.putImageData(imageData, 0,0);
		return canvasEditor.hiddenCanvas;
	}
	
	//get transarency Texture
	canvasEditor.transparentcyStrip = new Image();
	canvasEditor.transparentcyStrip.src = "images/transparency.png";
	canvasEditor.transparentcyStrip.onload = function(){
		//Draw Canvas
		canvasEditor.drawAll();
	};
}