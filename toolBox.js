var toolBox = [];
var selectedTool = 0;

function toolBoxInitialisation(){
	toolBox[0] = {"tool":"pensil", "Size":4, "update":function(value){this.Size = value; document.getElementById('sizeDisplay').innerHTML = this.Size; },  "options":function(){return "<b>Pensil</b> - Size: <div id = 'sizeDisplay' style= 'width:20px;display:inline-block;'>"+this.Size+"</div> <input type = 'range' oninput = 'toolBox[0].update(this.value);' min = '1' max = '20' value = '"+this.Size+"'>";}};
	toolBox[1] = {"tool":"fill", "Threshold":50,"update":function(value){this.Threshold = value; document.getElementById('thresholdDisplay').innerHTML = this.Threshold; }, "options":function(){return "<b>Fill</b> - Threshold: <div id = 'thresholdDisplay' style= 'width:20px;display:inline-block;'>"+this.Threshold+"</div> <input type = 'range' oninput = 'toolBox[1].update(this.value);' min = '1' max = '100' value = '"+this.Threshold+"'>";}};
	
	
	
	selectTool(0);
}
function selectTool(toolID){
	selectedTool = toolID;
	document.getElementById('toolOptions').innerHTML = toolBox[selectedTool].options();
	for (var i = 0; i < toolBox.length; i++){
		if(i == toolID){
			document.getElementById('tool' + i).className = 'button selected';
		}else{
			document.getElementById('tool' + i).className = 'button';
		}
	}
}