var imgLayers = [];
var selectedLayer = 0;
var	nextLayerID = 1;

//helper function for arrays to allow for items to be swaped on function call
function swapObjects(array, indexA, indexB) {
	var temp = array[indexA];
	array[indexA] = array[indexB];
	array[indexB] = temp;
};


function layerInitialisation(){
	
	imgLayers.push(new_Layer("Background"));
	layerDisplay()
}

function layerDisplay(){
	var layerHolder = document.getElementById("layerHolder");
	layerHolder.innerHTML = "";
	for (var l = 0; l < imgLayers.length; l++){
		var html= "<div onclick='selectLayer("+ l + ");' class = 'layerBox"; 
		if (l == selectedLayer){ html += " selected";}
		html += "'>"+imgLayers[l].Name+"</div>";
		layerHolder.insertAdjacentHTML('afterbegin', html);
	}
}

function addLayer(name){
	if (name == undefined){
		imgLayers.push(new_Layer("Layer"+nextLayerID));
	}else{
		imgLayers.push(new_Layer(name));
	}
	nextLayerID++;
	layerDisplay();
	canvasEditor.drawAll();
}
function new_Layer(name){
	var context = canvasEditor.canvas.getContext("2d");
	return {"Name":name, "img": context.createImageData(canvasEditor.canvas.width,canvasEditor.canvas.height)}
}
function removeLayer(){
	if(confirm("Are You sure you sure you want to delete Layer: "+ imgLayers[selectedLayer].Name)){
		imgLayers.splice(selectedLayer, 1);
	}
	layerDisplay();
	canvasEditor.drawAll();
}
function moveUp(){
	if (selectedLayer < imgLayers.length-1){
		swapObjects(imgLayers, selectedLayer, selectedLayer+1);
		selectedLayer+=1;
	}
	layerDisplay();
	canvasEditor.drawAll();
}
function moveDown(){
	if (selectedLayer > 0){
		swapObjects(imgLayers, selectedLayer, selectedLayer-1);
		selectedLayer-=1;
	}
	layerDisplay();
	canvasEditor.drawAll();
}

function selectLayer(layerID){
	selectedLayer = layerID;
	layerDisplay();
}

//helper function added to arrays to allow for items to be swaped on function call
Array.prototype.swap = function(indexA, indexB) {
	var temp = this[indexA];
	this[indexA] = this[indexB];
	this[indexB] = temp;
};