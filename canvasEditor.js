var canvasEditor = {};

function canvasEditorInitialisation(){
	//Get Canvas
	canvasEditor.canvas = document.getElementById("canvas");
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
		for (var x = 0; x < canvasEditor.canvas.width; x += canvasEditor.transparentcyStrip.width){
			for (var y = 0; y < canvasEditor.canvas.height; y += canvasEditor.transparentcyStrip.height){
				context.drawImage(canvasEditor.transparentcyStrip, x, y);
			}
		}
		
	}
	
	canvasEditor.handlemouseDown = function(x, y){
		
	}
		
	//get transarency Texture
	canvasEditor.transparentcyStrip = new Image();
	canvasEditor.transparentcyStrip.src = "images/transparency.png";
	canvasEditor.transparentcyStrip.onload = function(){
		//Draw Canvas
		canvasEditor.drawAll();
	};
}