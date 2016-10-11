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
	imgLayers.push({"Name":"Background"});
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

function addLayer(){
	imgLayers.push({"Name":"Layer"+nextLayerID})
	nextLayerID++;
	layerDisplay();
}
function removeLayer(){
	if(confirm("Are You sure you sure you want to delete Layer: "+ imgLayers[selectedLayer].Name)){
		imgLayers.splice(selectedLayer, 1);
	}
	layerDisplay();
}
function moveUp(){
	if (selectedLayer < imgLayers.length-1){
		swapObjects(imgLayers, selectedLayer, selectedLayer+1);
		selectedLayer+=1;
	}
	layerDisplay();
}
function moveDown(){
	if (selectedLayer > 0){
		swapObjects(imgLayers, selectedLayer, selectedLayer-1);
		selectedLayer-=1;
	}
	layerDisplay();
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