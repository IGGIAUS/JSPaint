var toolBox = [];
var selectedTool = 0;

function toolBoxInitialisation(){
	toolBox[0] = "pen";
	
}
function selectTool(toolID){
	selectedTool = toolID;
	for (var i = 0; i < toolBox.length; i++){
		if(i == toolID){
			document.getElementById('tool' + i).className = 'button selected';
		}else{
			document.getElementById('tool' + i).className = 'button';
		}
	}
}