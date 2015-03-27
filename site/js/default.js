$(document).ready(function() {
	getDirs();
});

function getDirs()
{
	for(var o in tree){
		var name = o.replace("../", "")
		if('..'==o) name = '/';
        $("#folder_list").append('<li class="folder folder-childs" onclick="getFiles(\''+o+'\')">'+name+'</li>');
    }  
}

function getFiles(name)
{
	$("#main-right").html('');
	var files = tree[name];
	var len = files.length;
	for(var i=0; i<len; i++){
		$("#main-right").append('<a href="javascript:pop(\''+files[i]+'\', '+i+', '+len+')"><img src="'+files[i]+'" width="100" /></a>');
	}
}

function pop(pic, start, end)
{
	//$("#bgMask").show();
	$("#pop").html('<img src="'+pic+'" />');
}
