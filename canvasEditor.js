var canvasEditor = {};

function min(num1, num2){
	if (num1 < num2){
		return num1;
	}else{
		return num2;
	}
}
function max(num1, num2){
	if (num1 > num2){
		return num1;
	}else{
		return num2;
	}
}

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
		canvasEditor.pastX = undefined;
		canvasEditor.pastY = undefined;
	}
	canvasEditor.canvas.onmouseleave = function(){
		canvasEditor.mouseDown = false;
		canvasEditor.pastX = undefined;
		canvasEditor.pastY = undefined;
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
		//Do diffrent things depending on mode
		switch (toolBox[selectedTool].tool){
			case "pensil":
				var size = (toolBox[selectedTool].Size / 2);
				var colour =  colourPicker.getCurrentRGB();
				if (canvasEditor.pastX == undefined && canvasEditor.pastY == undefined){
					//Draw First Click
					for (var tx = -size; tx <= size; tx++){
						for (var ty = -size; ty <= size; ty++){
							canvasEditor.colourPixel(Math.round(x + tx), Math.round(y + ty),colour);
						}
					}
				}else{
					//Draw Lines between each possition read whist mouse down
					//Get distances
					var xDist = x - canvasEditor.pastX;
					var yDist = y - canvasEditor.pastY;
					//get most number of steps number of steps
					steps = max(Math.abs(xDist), Math.abs(yDist));
					if (steps > 0){
						var xStep = xDist/steps;
						var yStep = yDist/steps;
						var cx = canvasEditor.pastX;
						var cy = canvasEditor.pastY;
						for (var i =0; i< steps; i++){
							cx += xStep;
							cy += yStep;
							//Draw new position
							for (var tx = -size; tx <= size; tx++){
								for (var ty = -size; ty <= size; ty++){
									canvasEditor.colourPixel(Math.round(cx + tx), Math.round(cy + ty),colour);
								}
							}
						}
					}
				}
				canvasEditor.pastX = x;
				canvasEditor.pastY = y;
				break;
			case "fill":
				/*Recisive function quickly caused overflow errors*/
				
				/*Treashhold implementation TODO
				var GrayScale = (Red * 0.3 + Green * 0.59 + Blue * 0.11)/3;
				gray[0] = GrayScale;
				gray[1] = GrayScale;
				gray[2] = GrayScale;
				gray[4] = GrayScale; */				
			
				var startColour = canvasEditor.getPixelColour(x, y);
				var endColour = colourPicker.getCurrentRGB();
				
				//Stack Used to simulate recustion
				var stack = [{"x":x, "y":y, "step":0}];
				
				var curStep;
				var newX;
				var newY;
				
				while (stack.length > 0){
					curStep = stack[stack.length-1].step;
					newX = stack[stack.length-1].x + ((curStep % 3) -1);
					newY = stack[stack.length-1].y + (Math.floor(curStep/3)-1)
					stack[stack.length-1].step = ((curStep==3)?5:curStep+1);
					//if colour of next pixel matches, change colour and add to stack
					if (colourPicker.colourCompare(canvasEditor.getPixelColour(newX,newY), startColour)){
						canvasEditor.colourPixel(newX, newY,endColour);
						stack.push({"x":newX, "y":newY, "step":0})
					}
					//if pixel has fulfilled all dircetions pop off stack
					if (stack[stack.length-1].step > 9){
						stack.pop()
					}
				}
				
				break;
		}		
		canvasEditor.drawAll();
	}
	canvasEditor.colourPixel = function(x,y, colour){
		//convert coordanates to linar
		var index = (x + (canvasEditor.canvas.width * y)) * 4
		imgLayers[selectedLayer].img.data[index +0] = colour[0];
		imgLayers[selectedLayer].img.data[index +1] = colour[1];
		imgLayers[selectedLayer].img.data[index +2] = colour[2];
		imgLayers[selectedLayer].img.data[index +3] = colour[3];
	}
	canvasEditor.getPixelColour = function(x,y){
		var index = (x + (canvasEditor.canvas.width * y)) * 4
		var colour = [];
		colour[0] = imgLayers[selectedLayer].img.data[index +0];
		colour[1] = imgLayers[selectedLayer].img.data[index +1];
		colour[2] = imgLayers[selectedLayer].img.data[index +2];
		colour[3] = imgLayers[selectedLayer].img.data[index +3];
		return colour;
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